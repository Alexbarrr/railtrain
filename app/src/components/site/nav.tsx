import { useState } from "react";

import { PHONE, PHONE_HREF } from "../../content/site";

const LINKS = [
  { href: "/o-kompanii", label: "О компании" },
  { href: "/prices", label: "Цены и сроки" },
  { href: "/gallery", label: "Фотогалерея" },
  { href: "/otzivi", label: "Отзывы" },
  { href: "/dokumenty", label: "Документы" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between gap-6 px-5 md:px-10">
        <a href="/" className="flex items-baseline gap-2" aria-label="Рейл Трейн Сервис, на главную">
          <span className="font-display text-sm font-black tracking-tight text-field">РЕЙЛ ТРЕЙН</span>
          <span className="font-display text-sm font-medium tracking-tight text-ink/70">СЕРВИС</span>
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/75 transition-colors hover:text-field"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="hidden font-data text-sm text-ink md:block">
            {PHONE}
          </a>
          {/* CTA-штамп: физически «пропечатывается» при нажатии */}
          <a
            href="/contacts"
            className="hidden bg-ochre px-4 py-2 text-sm font-bold text-ink transition-transform duration-100 active:rotate-[-1.5deg] active:scale-95 sm:block"
          >
            Рассчитать
          </a>
          <button
            type="button"
            className="xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-ink/15 bg-paper px-5 py-4 xl:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-base font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href={PHONE_HREF} className="font-data text-sm text-field">
              {PHONE}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
