import { useState } from "react";

const LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#geography", label: "География" },
  { href: "#prices", label: "Тарифы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contact", label: "Контакты" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-steel/50 bg-paper/90 backdrop-blur">
      <nav className="flex h-16 items-center justify-between gap-6 px-6 md:px-12">
        <a href="#hero" className="flex items-center gap-3" aria-label="Rail Train Service, на главную">
          <img src="/assets/logo.png" alt="RTS" className="rts-icon h-8 w-auto" />
          <span className="hidden font-display text-sm font-extrabold tracking-tight sm:block">
            Rail Train Service
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink/80 transition-colors hover:text-cobalt"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="tel:+74959436169"
            className="hidden font-data text-sm text-ink transition-colors hover:text-cobalt md:block"
          >
            +7 (495) 943-61-69
          </a>
          {/* CTA-«видоискатель»: уголки смыкаются вокруг лейбла на hover */}
          <a href="#contact" className="group relative hidden px-4 py-2 text-sm font-semibold text-cobalt sm:block">
            <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-cobalt transition-all duration-200 group-hover:h-full group-hover:w-2" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cobalt transition-all duration-200 group-hover:h-full group-hover:w-2" aria-hidden="true" />
            Рассчитать
          </a>
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="mt-1.5 block h-px w-6 bg-ink" />
            <span className="mt-1.5 block h-px w-6 bg-ink" />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-steel/50 bg-paper px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="tel:+74959436169" className="font-data text-sm text-cobalt">
              +7 (495) 943-61-69
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
