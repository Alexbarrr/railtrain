
import { SERVICES } from "../../content/site";
import { withBase } from "../../lib/base";

// Полосы-плакаты услуг (board v2): чередование полей зелёный → крем → чернила,
// индекс охрой, документальная фото-марка справа.
const FIELDS = [
  { band: "bg-field text-paper", photoFilter: "sepia(0.2) hue-rotate(100deg) saturate(0.8)" },
  { band: "bg-paper text-ink", photoFilter: "none" },
  { band: "bg-ink text-paper", photoFilter: "grayscale(0.5)" },
  { band: "bg-paper text-ink", photoFilter: "none" },
  { band: "bg-field text-paper", photoFilter: "sepia(0.2) hue-rotate(100deg) saturate(0.8)" },
];

export function ServiceBands() {
  return (
    <section id="services" aria-label="Услуги">
      {SERVICES.map((s, i) => {
        const f = FIELDS[i % FIELDS.length];
        return (
          <a
            key={s.href}
            href={withBase(s.href)}
            className={`group flex flex-col gap-6 border-t border-ink/20 px-5 py-12 transition-colors md:flex-row md:items-center md:gap-10 md:px-10 md:py-14 ${f.band}`}
          >
            <div className="min-w-0 flex-1">
              <h2 className="break-words font-display text-2xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl">
                {s.title}
                <span aria-hidden="true" className="ml-4 inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
              </h2>
              <p className="mt-4 max-w-[58ch] text-base leading-relaxed opacity-75">{s.note}</p>
            </div>
            <span className="font-display text-6xl font-black leading-none text-ochre md:text-7xl" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="stamp w-full max-w-xs shrink-0 rotate-1 transition-transform duration-300 group-hover:rotate-0 md:w-60">
              <img src={withBase(s.photo)} alt={s.title} loading="lazy" className="block aspect-[4/3] w-full object-cover" style={{ filter: f.photoFilter }} />
            </div>
          </a>
        );
      })}
    </section>
  );
}
