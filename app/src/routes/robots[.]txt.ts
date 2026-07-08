import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      // Сайт намеренно закрыт от индексации: это пересборка rtrain.ru на
      // техническом сабдомене, копия не должна конкурировать с основным
      // доменом. При переезде на боевой домен вернуть Allow + sitemap.
      GET: async () => {
        const body = ['User-agent: *', 'Disallow: /'].join('\n')
        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
