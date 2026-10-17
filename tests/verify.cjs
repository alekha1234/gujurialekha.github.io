// End-to-end checks for the portfolio, run against a live server: `npm run verify` (dev server on :3000)
// or `node tests/verify.cjs <base-url>`. Uses the installed Chrome. Read-only: never submits the contact form.
const { chromium } = require('playwright-core');
const path = require('path');

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const SHOTS = path.join(process.cwd(), 'test-results');
require('fs').mkdirSync(SHOTS, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

function watch(page) {
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 200)));
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message.slice(0, 200)));
  page.on('response', (r) => r.status() >= 400 && !/google/.test(r.url()) && errs.push(r.status() + ' ' + r.url()));
  return errs;
}
const landsAtTop = (top) => top >= -5 && top <= 120;

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // ---------- Desktop ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = watch(p);
  const gaRequests = [];
  p.on('request', (r) => /googletagmanager\.com\/gtag\/js/.test(r.url()) && gaRequests.push(r.url()));
  await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 180000 });
  await p.waitForTimeout(2000);

  check('Analytics not loaded before interaction', gaRequests.length === 0, `${gaRequests.length} gtag requests`);
  check('3D scene waits for interaction', (await p.locator('canvas').count()) === 0);
  await p.mouse.move(700, 450);
  await p.waitForSelector('canvas', { timeout: 20000 }).catch(() => {});
  check('3D scene starts after mouse move', (await p.locator('canvas').count()) > 0);
  await p.waitForTimeout(2000);
  await p.screenshot({ path: SHOTS + '/desktop-hero.png' });

  const h1 = await p.locator('h1').innerText();
  check('Hero H1 shows full name', /ALEKHA GUJURI/i.test(h1), h1.replace(/\n/g, ' '));
  const heroLinks = await p.locator('#top a.rounded-md').evaluateAll((as) => as.map((a) => [a.textContent.trim(), a.getAttribute('href')]));
  check('Hero primary CTA is "View projects" → #projects', heroLinks[0]?.[0] === 'View projects' && heroLinks[0]?.[1] === '#projects', JSON.stringify(heroLinks));
  check('Status line', /Open to AI\/ML & Data Science Roles/i.test(await p.locator('#top').innerText()));

  const navLinks = await p.locator('nav[aria-label="Main Navigation"] a').evaluateAll((as) => as.map((a) => ({ t: a.textContent.trim(), h: a.getAttribute('href'), tg: a.target })));
  check('Nav order', navLinks.map((l) => l.t).join(',') === 'About,Skills,AI Lab,Projects,Experience,Blogs,Contact', navLinks.map((l) => l.t).join(','));
  const blogs = navLinks.find((l) => l.t === 'Blogs');
  check('Blogs nav → blog in new tab', blogs?.h === 'https://alekha1234.github.io/blog/' && blogs?.tg === '_blank', JSON.stringify(blogs));

  for (const id of ['about', 'skills', 'ai-lab', 'projects', 'experience', 'contact']) {
    await p.locator(`nav[aria-label="Main Navigation"] a[href="#${id}"]`).click();
    await p.waitForTimeout(1800);
    const top = await p.evaluate((id) => Math.round(document.getElementById(id).getBoundingClientRect().top), id);
    check(`Nav "${id}" lands at top`, landsAtTop(top), `top=${top}px`);
  }
  check('Analytics loads after interaction', gaRequests.length === 1, `${gaRequests.length} gtag requests`);

  const body = await p.locator('body').innerText();
  const banned = ['VERIFIED', '256-BIT', 'UTC_CLOCK', 'Apache-2.0', 'YOUR_NAME', 'PROJECT_OR_INQUIRY_BRIEF', 'Inspect', 'Hover ', 'min read',
    'particles in the pipeline', 'MODEL CARDS', 'NODE_INSPECTOR', 'CASE_STUDY', 'DATA_SOURCE'];
  const found = banned.filter((b) => body.includes(b));
  check('Removed copy is gone', found.length === 0, found.join(', ') || 'none found');
  for (const label of ['09 // WRITING', '10 // CONTACT', '07.B // ARCHIVE', '08 // DATA PATH']) check(`Section label "${label}"`, body.toUpperCase().includes(label));
  check('AI Lab has one work link per section (4)', (await p.locator('#ai-lab h3 + a').count()) === 4, `${await p.locator('#ai-lab h3 + a').count()} links`);

  const tabs = await p.locator('[aria-label="Career milestones"] [role="tab"]').allInnerTexts();
  const selected = await p.locator('[aria-label="Career milestones"] [aria-selected="true"]').innerText();
  check('Experience newest first', tabs[0].trim() === 'LPU' && /Science College/.test(tabs.at(-1)), tabs.map((t) => t.trim()).join(' | '));
  check('Experience default = Trinity Mobility', /Trinity Mobility/.test(selected), selected.trim());

  const thumbs = await p.locator('#projects li img').evaluateAll((imgs) => imgs.map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 })));
  check('Featured images are the project visuals and load', thumbs.length === 6 && thumbs.every((t) => /\/documents\/projects\/[a-z0-9-]+\.jpg$/.test(t.src) && t.ok), thumbs.map((t) => t.src.split('/').pop()).join(', '));
  const cards = p.locator('#projects li');
  const irrigation = cards.filter({ hasText: 'Smart Irrigation' }).first();
  const composer = cards.filter({ hasText: 'ML Composer' }).first();
  check('Smart Irrigation card says Proprietary (no Code link)', (await irrigation.getByText('Proprietary').count()) === 1 && (await irrigation.getByRole('link', { name: /^Code:/ }).count()) === 0);
  check('ML Composer card keeps Code link', (await composer.getByRole('link', { name: /^Code:/ }).count()) === 1);
  await irrigation.getByRole('button', { name: 'Details' }).click();
  const dialog = p.getByRole('dialog');
  await dialog.waitFor({ timeout: 10000 });
  await p.screenshot({ path: SHOTS + '/desktop-modal.png' });
  check('Details modal: proprietary note & plain tags', (await dialog.getByText('Proprietary · built at Trinity Mobility').count()) === 1 && (await dialog.getByText('Data source').count()) === 1);
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await p.waitForTimeout(500);
  check('Modal closes', (await p.getByRole('dialog').count()) === 0);

  const blogCards = await p.locator('#writing a[href*="/blog/"][href$=".html"]').evaluateAll((as) => as.map((a) => a.href));
  check('Blog cards link to real articles', blogCards.length >= 2, blogCards.join(' , '));

  const labels = await p.locator('#contact form label').allInnerTexts();
  check('Contact labels are plain', ['Name', 'Email', 'Phone', 'Message'].every((l, i) => labels[i]?.startsWith(l)), labels.map((l) => l.trim().split('\n')[0]).join(' | '));
  const formY = await p.locator('#contact form').evaluate((f) => f.getBoundingClientRect().top);
  const termY = await p.getByText('INITIALIZE CONNECTION').evaluate((b) => b.getBoundingClientRect().top);
  check('Desktop: terminal sits below the form', termY > formY);
  await p.locator('#contact form button[type="submit"]').click();
  await p.waitForTimeout(400);
  const fieldErrs = await p.locator('#contact form [role="alert"], #contact form .text-red-400').count();
  check('Empty submit shows validation (nothing sent)', fieldErrs > 0, `${fieldErrs} error messages`);
  check('Footer shows © line only', /© \d{4} Alekha Gujuri/.test(await p.locator('footer').innerText()));
  check('Desktop: no console/network errors', errs.length === 0, errs.slice(0, 5).join(' || '));

  // Case-study pages
  const cs = await ctx.newPage();
  const csErrs = watch(cs);
  await cs.goto(BASE + '/projects/smart-irrigation-pipeline/', { waitUntil: 'networkidle', timeout: 180000 });
  check('Case study: Key contributions list', (await cs.getByRole('heading', { name: 'Key contributions' }).count()) === 1 && (await cs.locator('ul.list-disc li').count()) >= 3);
  check('Case study (proprietary): no source-code CTA', (await cs.getByText('Want to see the source code?').count()) === 0);
  check('Case study: back link → /#projects', (await cs.getByRole('link', { name: /Return to Portfolio/ }).getAttribute('href'))?.endsWith('/#projects'));
  check('Case study: banner is the project visual', /smart-irrigation-pipeline\.jpg$/.test(await cs.locator('main img').first().getAttribute('src')));
  await cs.goto(BASE + '/projects/ml-composer-platform/', { waitUntil: 'networkidle', timeout: 180000 });
  check('Case study (public repo): source-code CTA shown', (await cs.getByText('Want to see the source code?').count()) === 1);
  check('Case study pages: no errors', csErrs.length === 0, csErrs.slice(0, 3).join(' || '));
  await ctx.close();

  // ---------- 1024 px nav ----------
  const t = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  await t.goto(BASE + '/?no3d', { waitUntil: 'networkidle', timeout: 180000 });
  const nav = await t.evaluate(() => {
    const n = document.querySelector('nav[aria-label="Main Navigation"]');
    const oneLine = [...n.querySelectorAll('a')].every((a) => a.getBoundingClientRect().height < 30);
    return { overflow: n.parentElement.scrollWidth - n.parentElement.clientWidth, oneLine };
  });
  check('1024px: nav fits on one line', nav.overflow <= 0 && nav.oneLine, JSON.stringify(nav));
  await t.close();

  // ---------- Phone ----------
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const mp = await m.newPage();
  const mErrs = watch(mp);
  await mp.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 180000 });
  await mp.waitForTimeout(2000);
  await mp.screenshot({ path: SHOTS + '/phone-hero.png' });
  const ctaBottom = await mp.getByRole('link', { name: 'View projects' }).evaluate((a) => a.getBoundingClientRect().bottom);
  check('Phone: "View projects" visible on first screen', ctaBottom < 844, `bottom=${Math.round(ctaBottom)}px`);
  check('Phone: focus chips hidden', !(await mp.locator('[aria-label="Focus areas"]').isVisible()));
  check('Phone: status badge on one line', (await mp.locator('#top .rounded-full.glass').evaluate((e) => e.getBoundingClientRect().height)) < 34);
  check('Phone: no horizontal scroll', await mp.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  check('Phone: contact terminal hidden', !(await mp.getByText('INITIALIZE CONNECTION').isVisible()));
  await mp.getByRole('button', { name: /Open Navigation Menu/ }).click();
  const mobileNav = mp.locator('nav[aria-label="Mobile Navigation"]');
  check('Phone menu lists Experience & Blogs', (await mobileNav.getByRole('link', { name: /Experience/ }).count()) === 1 && (await mobileNav.getByRole('link', { name: /Blogs/ }).count()) === 1);
  await mobileNav.getByRole('link', { name: /Experience/ }).click();
  await mp.waitForTimeout(1800);
  const expTop = await mp.evaluate(() => Math.round(document.getElementById('experience').getBoundingClientRect().top));
  check('Phone menu → Experience lands at top & menu closes', landsAtTop(expTop) && !(await mobileNav.isVisible()), `top=${expTop}px`);
  check('Phone: no 3D scene even after interaction', (await mp.locator('canvas').count()) === 0);
  await mp.locator('#contact').scrollIntoViewIfNeeded();
  await mp.waitForTimeout(500);
  await mp.screenshot({ path: SHOTS + '/phone-contact.png' });
  check('Phone: no console/network errors', mErrs.length === 0, mErrs.slice(0, 5).join(' || '));
  await m.close();
  await browser.close();

  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed. Screenshots: ${SHOTS}`);
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error('SCRIPT ERROR', e.message);
  process.exit(1);
});
