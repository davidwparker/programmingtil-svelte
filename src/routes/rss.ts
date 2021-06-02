import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + '/api/v1/posts?rss=t');
  const posts = await data.json();
  const body = render(posts.data);

  const headers = {
    'Cache-Control': `max-age=0, s-max-age=${600}`,
    'Content-Type': 'application/rss+xml',
  };
  return {
    body,
    headers,
  };
}

const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <atom:link href="http://wwww.programmingtil.com/rss" rel="self" type="application/rss+xml" />
  <title>ProgrammingTIL</title>
  <link>https://www.programmingtil.com</link>
  <description>Programming tutorials</description>
  ${posts
    .map(
      (post) => `<item>
<guid>https://www.programmingtil.com/posts/${post.attributes.slug}</guid>
<title>${post.attributes.title}</title>
<link>https://www.programmingtil.com/posts/${post.attributes.slug}</link>
<pubDate>${new Date(post.attributes.publishedAt).toUTCString()}</pubDate>
<description>${post.attributes.content}</description>
</item>`
    )
    .join('')}
</channel>
</rss>
`;
