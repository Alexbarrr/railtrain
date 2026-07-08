const ITEMS = [
  { icon: "/assets/icons/icon-6.png", text: "Оформление товаротранспортных и перевозочных документов, включая ГУ-12" },
  { icon: "/assets/icons/icon-5.png", text: "Железнодорожный тариф до станции назначения" },
  { icon: "/assets/icons/icon-3.png", text: "Пользование железнодорожным подвижным составом" },
  { icon: "/assets/icons/icon-2.png", text: "Подача и уборка платформ, маневровая работа, крановые операции на терминалах" },
  { icon: "/assets/icons/icon-7.png", text: "Охрана на всём пути следования для грузов, подлежащих охране РЖД" },
  { icon: "/assets/icons/icon-1.png", text: "Пользование контейнером оперативного парка экспедитора" },
  { icon: "/assets/icons/icon-8.png", text: "Постановка вагонов и контейнеров в ускоренные составы" },
];

// Редакционные офсетные колонки (board-5): слева заголовок, справа ниже
// путевой список с иконками сгенерированного сета.
export function Included() {
  return (
    <section className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl font-black leading-none tracking-tighter md:text-5xl">
            Что входит в стоимость
          </h2>
          <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-ink/85">
            Работаем по договору с полной материальной ответственностью. Груз
            можно застраховать и отслеживать на всём пути, а о его движении мы
            сообщаем сами.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:mt-24">
          <ol className="border-t border-steel">
            {ITEMS.map((item, i) => (
              <li key={item.text} className="flex items-center gap-5 border-b border-steel py-5">
                <span className="font-data text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                <img src={item.icon} alt="" className="rts-icon h-9 w-9 shrink-0 object-contain" />
                <p className="text-base leading-relaxed text-ink/90">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
