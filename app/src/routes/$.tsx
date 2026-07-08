import { createFileRoute, notFound } from "@tanstack/react-router";

import { Blocks, type Block } from "../components/site/blocks";
import { Contact } from "../components/site/contact";
import { CtaBand } from "../components/site/cta-band";
import { Footer } from "../components/site/footer";
import { Nav } from "../components/site/nav";
import { PagePoster } from "../components/site/page-poster";
import galleryJson from "../content/gallery.json";
import pagesJson from "../content/pages.json";
import { CITY_PAGES, PRICES, SERVICE_LINKS } from "../content/site";

type PageData = { title: string; desc: string; h1: string; blocks: Block[]; images: string[] };
const PAGES = pagesJson as unknown as Record<string, PageData>;
const GALLERY = galleryJson as Record<string, { title: string; images: string[] }>;

// Все 55 контентных URL старого rtrain.ru рендерятся этим сплат-роутом:
// структура и title/description сохраняются 1:1 (SEO).
export const Route = createFileRoute("/$")({
  loader: ({ params }) => {
    const path = "/" + (params._splat ?? "").replace(/\/+$/, "");
    const page = PAGES[path];
    if (!page) throw notFound();
    const city = CITY_PAGES[path];
    if (path === "/gallery") page.h1 = "Фотогалерея";
    const albumSlug = path.startsWith("/gallery/") ? path.split("/")[2] : null;
    return {
      path,
      page,
      city: city ?? null,
      album: albumSlug ? { slug: albumSlug, ...GALLERY[albumSlug] } : null,
      isGalleryIndex: path === "/gallery",
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.page.title },
          ...(loaderData.page.desc ? [{ name: "description", content: loaderData.page.desc }] : []),
        ]
      : [],
  }),
  component: ContentPage,
});

function GalleryIndex() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(GALLERY).map(([slug, album], i) => (
        <a
          key={slug}
          href={`/gallery/${slug}`}
          className={`stamp block transition-transform duration-300 hover:rotate-0 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
        >
          <img
            src={`/gallery/${slug}/thumb/${album.images[0]}`}
            alt={album.title}
            loading="lazy"
            className="block aspect-[4/3] w-full object-cover"
          />
          <p className="px-2 pb-1 pt-3 text-center font-data text-sm text-ink/80">
            {album.title} · {album.images.length} фото
          </p>
        </a>
      ))}
    </div>
  );
}

function AlbumGrid({ slug, album }: { slug: string; album: { title: string; images: string[] } }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7">
      {album.images.map((img, i) => (
        <a
          key={img}
          href={`/gallery/${slug}/${img}`}
          target="_blank"
          rel="noreferrer"
          className={`stamp block transition-transform duration-300 hover:rotate-0 ${i % 3 === 1 ? "rotate-1" : i % 3 === 2 ? "-rotate-1" : ""}`}
        >
          <img
            src={`/gallery/${slug}/thumb/${img}`}
            alt={`${album.title}, фото ${i + 1}`}
            loading="lazy"
            className="block aspect-[4/3] w-full object-cover"
          />
        </a>
      ))}
    </div>
  );
}

function ContentPage() {
  const { path, page, city, album, isGalleryIndex } = Route.useLoaderData();

  const isService = SERVICE_LINKS.some((l) => l.href === path);
  const related = isService ? SERVICE_LINKS.filter((l) => l.href !== path).slice(0, 8) : [];

  const facts = city
    ? [
        ...(city.km ? [{ label: city.km }] : []),
        ...(city.days ? [{ label: city.days }] : []),
        ...(city.sea ? [{ label: "морское плечо" }] : []),
        ...(() => {
          const pr = PRICES.find((p) => city.city.startsWith(p.city.split(" ")[0]));
          return pr ? [{ label: `от ${pr.p20} ₽ за 20 фут` }] : [];
        })(),
      ]
    : undefined;

  return (
    <div className="bg-paper font-body text-ink">
      <Nav />
      <main>
        <PagePoster
          h1={city ? `Москва → ${city.city}` : page.h1 || page.title}
          crumb={page.h1 || page.title}
          photo={!city && page.images.length ? page.images[0] : undefined}
          field={city ? "ink" : "green"}
          facts={facts}
        />

        <div className="px-5 py-12 md:px-10 md:py-16">
          {city ? (
            <h2 className="mb-8 max-w-4xl font-display text-2xl font-black uppercase leading-tight tracking-tight text-field md:text-3xl">
              {page.h1 || page.title}
            </h2>
          ) : null}

          {isGalleryIndex ? (
            <GalleryIndex />
          ) : album && album.images ? (
            <AlbumGrid slug={album.slug} album={album} />
          ) : (
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Blocks blocks={page.blocks} />
                {page.images.length > 1 ? (
                  <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">
                    {page.images.slice(1, 7).map((img) => (
                      <div key={img} className="stamp">
                        <img src={img} alt={page.h1 || page.title} loading="lazy" className="block aspect-[4/3] w-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              {related.length ? (
                <aside className="lg:col-span-4">
                  <p className="font-data text-xs uppercase tracking-[0.2em] text-ink/50">Другие услуги</p>
                  <nav className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
                    {related.map((l) => (
                      <a key={l.href} href={l.href} className="group flex items-center justify-between py-3 text-sm font-medium hover:text-field">
                        {l.label}
                        <span aria-hidden="true" className="text-ochre transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </a>
                    ))}
                  </nav>
                </aside>
              ) : null}
            </div>
          )}
        </div>

        {path === "/contacts" ? <Contact id="form" /> : <CtaBand />}
      </main>
      <Footer />
    </div>
  );
}
