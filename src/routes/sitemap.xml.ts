import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  // On the fly
  // const data = await fetch(import.meta.env.VITE_API_ENDPOINT + '/api/v1/posts?published=t');
  // const posts = await data.json();
  // const body = render(posts.data);

  // Pre-created
  const data = await fetch(import.meta.env.VITE_SITEMAP_URL as string);
  const body = await data.text();

  const headers = {
    'Cache-Control': `max-age=0, s-max-age=${600}`,
    'Content-Type': 'application/xml',
  };
  return {
    body,
    headers,
  };
}

// const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
// <urlset
//   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
//   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//   xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
//   xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
//   xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
//   xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
//   xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
//   xmlns:xhtml="http://www.w3.org/1999/xhtml"
// >
// <url>
// <loc>https://www.mysite.com</loc>
// <lastmod>${new Date(posts[0].attributes.publishedAt).toISOString()}</lastmod>
// <changefreq>daily</changefreq>
// </url>
// <url>
// <loc>https://www.mysite.com/about</loc>
// <lastmod>2021-04-02T15:49:42.605Z</lastmod>
// <changefreq>yearly</changefreq>
// </url>
//   ${posts
//     .map(
//       (post) => `<url>
// <loc>https://www.mysite.com/posts/${post.attributes.slug}</loc>
// <lastmod>${new Date(post.attributes.publishedAt).toISOString()}</lastmod>
// <changefreq>daily</changefreq>
// </url>`
//     )
//     .join('')}
// </urlset>
// `;
