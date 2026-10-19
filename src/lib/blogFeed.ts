// Latest posts come from the blog's Quarto RSS feed (newest first). Regex instead of DOMParser so the
// same parser runs at build time (Node) and in the browser.
export const FEED_URL = 'https://gujurialekha.github.io/blog/index.xml';

export interface BlogPost {
  title: string;
  url: string;
  date: string;
  category: string;
  excerpt?: string;
}

const pick = (s: string, tag: string) => s.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1] ?? '';

const text = (s: string) =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

export function parseFeed(xml: string, limit = 4): BlogPost[] {
  return Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).slice(0, limit).map(([, item]) => {
    const excerpt = text(pick(item, 'description'));
    const date = new Date(pick(item, 'pubDate'));
    return {
      title: text(pick(item, 'title')),
      url: text(pick(item, 'link')),
      // Quarto writes a post's date as midnight in the author's time zone (IST): "2026-10-11" -> "Sat, 10 Oct 2026 18:30:00 GMT".
      date: isNaN(+date) ? '' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata' }),
      category: text(pick(item, 'category')),
      // A full-content feed puts the whole article here; only short summaries make a usable excerpt.
      excerpt: excerpt && excerpt.length <= 300 ? excerpt : undefined,
    };
  });
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(FEED_URL);
    return res.ok ? parseFeed(await res.text()) : [];
  } catch {
    return [];
  }
}
