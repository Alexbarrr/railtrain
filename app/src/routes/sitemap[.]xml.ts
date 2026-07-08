import { createFileRoute } from '@tanstack/react-router'

import pagesJson from '../content/pages.json'

// Все сохранённые URL старого rtrain.ru (56 страниц). Пока сайт закрыт
// в robots.txt, sitemap просто готов к переезду на боевой домен.
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin
        const today = new Date().toISOString().split('T')[0]
        const paths = Object.keys(pagesJson as Record<string, unknown>).sort()
        const urls = paths
          .map((p) =>
            [
              '  <url>',
              `    <loc>${origin}${p}</loc>`,
              `    <lastmod>${today}</lastmod>`,
              `    <priority>${p === '/' ? '1.0' : '0.7'}</priority>`,
              '  </url>',
            ].join('\n'),
          )
          .join('\n')
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          urls,
          '</urlset>',
        ].join('\n')
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
