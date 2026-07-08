export function Footer() {
  return (
    <footer className="border-t border-steel bg-paper px-6 py-12 md:px-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <img src="/assets/logo.png" alt="RTS" className="rts-icon h-9 w-auto" />
          <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-ink/70">
            Rail Train Service: отправка грузов железнодорожным транспортом из
            Москвы по всем станциям России.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm" aria-label="Разделы сайта">
          <a href="#services" className="text-ink/80 transition-colors hover:text-cobalt">Услуги</a>
          <a href="#geography" className="text-ink/80 transition-colors hover:text-cobalt">География</a>
          <a href="#prices" className="text-ink/80 transition-colors hover:text-cobalt">Тарифы</a>
          <a href="#reviews" className="text-ink/80 transition-colors hover:text-cobalt">Отзывы</a>
          <a href="#contact" className="text-ink/80 transition-colors hover:text-cobalt">Контакты</a>
        </nav>
        <div className="font-data text-sm text-ink/80">
          <a href="tel:+74959436169" className="block transition-colors hover:text-cobalt">
            +7 (495) 943-61-69
          </a>
          <a href="mailto:info@rtrain.ru" className="mt-1 block transition-colors hover:text-cobalt">
            info@rtrain.ru
          </a>
          <p className="mt-1">111024, Москва, ш. Энтузиастов, д. 5</p>
        </div>
      </div>
      <p className="mt-10 font-data text-xs text-ink/50">
        © 2004-2026 Rail Train Service
      </p>
    </footer>
  );
}
