
import gallery from "../../content/gallery.json";

// Мозаика реальных фото (board v2): паспарту-марки на кремовом поле.
const PICKS: Array<{ album: string; file: string }> = [
  { album: "pogruzka-avto-v-kontejnerakh", file: "IMG-20211130-WA0012.jpg" },
  { album: "pogruzka-oborudovaniya", file: "DSCF1036.jpg" },
  { album: "pogruzka-spetstekhniki", file: "IMG_1395.jpg" },
  { album: "pogruzka-stroj-tekhniki", file: "greider.jpg" },
  { album: "pogruzka-v-vagony-tsmgv", file: "IMG_0070.jpg" },
  { album: "pogruzka-na-avtomobili", file: "IMG_0925.jpg" },
];

export function GalleryPreview() {
  const albums = gallery as Record<string, { title: string; images: string[] }>;
  return (
    <section className="border-t border-ink/20 bg-paper px-5 py-16 text-ink md:px-10 md:py-24">
      <p className="font-data text-xs uppercase tracking-[0.25em] text-field">Фотогалерея</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
        Как мы грузим
      </h2>
      <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-ink/70">
        Никаких стоковых картинок: реальные погрузки наших клиентов на терминалах отправления.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8">
        {PICKS.map((p, i) => {
          const album = albums[p.album];
          if (!album) return null;
          return (
            <a
              key={p.album + p.file}
              href={`/gallery/${p.album}`}
              className={`stamp block transition-transform duration-300 hover:rotate-0 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
            >
              <img
                src={`/gallery/${p.album}/thumb/${p.file}`}
                alt={album.title}
                loading="lazy"
                className="block aspect-[4/3] w-full object-cover"
              />
              <p className="pt-2 text-center font-data text-xs text-ink/70">{album.title}</p>
            </a>
          );
        })}
      </div>

      <a
        href="/gallery"
        className="group mt-10 inline-flex items-center gap-3 font-display text-xl font-black uppercase tracking-tight text-field"
      >
        Вся галерея
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">→</span>
      </a>
    </section>
  );
}
