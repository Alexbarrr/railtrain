
import { ADDRESS, CITY_LINKS, EMAIL, PHONE, PHONE_HREF, SERVICE_LINKS } from "../../content/site";
import { withBase } from "../../lib/base";

// Большой SEO-футер: полная перелинковка услуг и городов, как на старом сайте.
export function Footer() {
  return (
    <footer className="bg-ink px-5 py-14 text-paper md:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="font-display text-base font-black tracking-tight">РЕЙЛ ТРЕЙН СЕРВИС</p>
          <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-paper/60">
            Отправка грузов железнодорожным транспортом из Москвы по всем станциям России. На магистрали с 2004 года.
          </p>
          <div className="mt-6 font-data text-sm text-paper/85">
            <a href={PHONE_HREF} className="block hover:text-ochre">{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="mt-1 block hover:text-ochre">{EMAIL}</a>
            <p className="mt-1 text-paper/60">{ADDRESS}</p>
          </div>
        </div>
        <nav className="lg:col-span-5" aria-label="Услуги">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-paper/50">Услуги</p>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {SERVICE_LINKS.map((l) => (
              <a key={l.href} href={withBase(l.href)} className="text-sm text-paper/75 transition-colors hover:text-ochre">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
        <nav className="lg:col-span-4" aria-label="Направления">
          <p className="font-data text-xs uppercase tracking-[0.2em] text-paper/50">Направления</p>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {CITY_LINKS.map((l) => (
              <a key={l.href} href={withBase(l.href)} className="text-sm text-paper/75 transition-colors hover:text-ochre">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
        <p className="font-data text-xs text-paper/50">© 2004-2026 Rail Train Service</p>
        <div className="flex gap-6 font-data text-xs">
          <a href={withBase("/o-kompanii")} className="text-paper/60 hover:text-ochre">О компании</a>
          <a href={withBase("/dokumenty")} className="text-paper/60 hover:text-ochre">Документы</a>
          <a href={withBase("/contacts")} className="text-paper/60 hover:text-ochre">Контакты</a>
        </div>
      </div>
    </footer>
  );
}
