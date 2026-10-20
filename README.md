# Gujuri Alekha · Data Scientist & AI / ML Engineer

<img src="public/documents/logos/gujuri-alekha-144.jpg" alt="Gujuri Alekha" width="96" height="96">

[![Live site](https://img.shields.io/badge/Live_site-gujurialekha.github.io-2563eb)](https://gujurialekha.github.io/)
[![Deploy](https://github.com/gujurialekha/gujurialekha.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/gujurialekha/gujurialekha.github.io/actions/workflows/deploy.yml)
[![Blog](https://img.shields.io/badge/Blog-gujurialekha.github.io%2Fblog-0ea5e9)](https://gujurialekha.github.io/blog/)

Personal portfolio of **Gujuri Alekha**, Associate Data Scientist at Trinity Mobility (Bengaluru, India). It covers time-series forecasting, multi-stage ML pipelines, smart-city IoT, generative AI / RAG and MLOps.

**Live:** https://gujurialekha.github.io/

## What's on the site

| Section | Content |
|---|---|
| Hero | Name, role, short bio, links to projects, contact and résumé (3D robot scene on desktop) |
| Profile & production pillars | Bio, key facts, AI capability modules, what I build in production |
| Technical skills | Five skill areas; brighter chips are tools used most in production |
| AI Lab | Four animated pipeline demos: ML, NLP, RAG / LLM, computer vision |
| Projects | Four featured case studies (each has its own page) and a searchable archive |
| Experience & education | Work history, education and certifications |
| Writing | Latest four posts, pulled live from the [blog](https://gujurialekha.github.io/blog/) |
| Contact | Contact details and a message form |

## Tech stack

Next.js 14 (static export) · React 18 · TypeScript · Tailwind CSS · three.js with React Three Fiber (hero only) · GitHub Pages

## Run locally

Requires Node.js 20.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run preview    # build, then serve out/ at http://localhost:4173 (gzip, like GitHub Pages)
```

**Lighthouse / PageSpeed:** measure `npm run preview` or the live URL, never `npm run dev` (unminified dev code scores far lower). Keep the tab in the foreground while it runs, or Lighthouse stops with `NO_FCP`. Stop `npm run dev` before `npm run preview`, because both use `.next/`.

**Checks:** with `npm run dev` running and Google Chrome installed, run:

```bash
npm run verify     # 56 Playwright checks across desktop, 1024px and phone sizes
```

This writes screenshots to `test-results/`. It never submits the contact form.

## Updating content

Most edits are data changes. No component code needed.

| To change | Edit |
|---|---|
| Name, bio, status, links, résumé | `src/data/personal.ts` |
| Jobs | `src/data/experience.ts` |
| Education and certifications | `src/data/education.ts` |
| Skills | `src/data/skills.ts` |
| Featured and archived projects | `src/data/projects.ts` (featured = `isFeatured: true`; image at `public/documents/projects/<slug>.jpg`) |
| Résumé PDF | `public/my_documents/resume/gujuri_alekha_resume.pdf` |
| Text for AI assistants | `public/llms.txt`, `public/llms-full.txt` |

**Blog posts** need no change here. The Writing section reads the blog's RSS feed at build time and again in the visitor's browser. A new post appears automatically once the blog deploys. Give each notebook a `description:` and `date:` in its front matter.

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It builds the site and publishes it to GitHub Pages at the root of `gujurialekha.github.io` (this repo's name matches the username, so it's the user site; the blog repo is served under `/blog/`). A daily rebuild at 02:30 UTC keeps the blog posts in the HTML current for search engines.

## Repository layout

```
src/app/          pages: home, /projects/<slug> case studies, sitemap, robots
src/components/   page sections; lab/ holds the hero 3D scene
src/data/         all portfolio content (see "Updating content")
src/lib/          blog feed parser, shared lab content
public/           images, résumé, favicon, llms.txt
tests/verify.cjs  end-to-end checks (npm run verify)
skills/ agents/ scripts/ hooks/ .agent(s)/ .claude-plugin/ .codex-plugin/
                  SEO agent toolkit used to audit this site, not part of the website build
```

## Contact

- Email: [gujurialekha@gmail.com](mailto:gujurialekha@gmail.com)
- LinkedIn: [gujurialekha](https://www.linkedin.com/in/gujurialekha/)
- GitHub: [@gujurialekha](https://github.com/gujurialekha)
- Kaggle: [gujurialekha](https://www.kaggle.com/gujurialekha)

## License

The code is licensed under [Apache 2.0](LICENSE.txt). Portfolio content (text, résumé, photos) © Gujuri Alekha.
