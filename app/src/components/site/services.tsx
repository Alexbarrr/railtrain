import { useState } from "react";

const SERVICES = [
  {
    title: "Контейнерные перевозки",
    icon: "/assets/icons/icon-1.png",
    image: "/assets/terminal.jpg",
    alt: "Портальный кран грузит синий контейнер на платформу",
    text: "Отправки в 20- и 40-футовых контейнерах оперативного парка, мультимодальные маршруты с морским плечом до Сахалина, Камчатки и Магадана.",
  },
  {
    title: "Вагонные перевозки",
    icon: "/assets/icons/icon-3.png",
    image: "/assets/wagons.jpg",
    alt: "Крытые вагоны на грузовой станции",
    text: "Крытые вагоны и вагоны-сетки для сборных и штучных грузов: от бытовок и блок-модулей до трансформаторов.",
  },
  {
    title: "Негабаритные грузы",
    icon: "/assets/icons/icon-2.png",
    image: "/assets/oversized.jpg",
    alt: "Негабаритный груз закреплён на железнодорожной платформе",
    text: "Перевозка крупногабаритного оборудования и техники на платформах: схемы погрузки, крепление, согласования.",
  },
  {
    title: "Перевозка автомобилей",
    icon: "/assets/icons/icon-4.png",
    image: "/assets/cars.jpg",
    alt: "Автомобили закреплены в двухъярусном вагоне-сетке",
    text: "Легковые, грузовики, автобусы и спецтехника в вагонах-сетках и контейнерах, включая Магадан и Петропавловск-Камчатский.",
  },
  {
    title: "Проектная логистика",
    icon: "/assets/icons/icon-6.png",
    image: "/assets/project.jpg",
    alt: "Инженеры координируют погрузку модулей на платформы",
    text: "Комплексные проекты: обследование маршрута, подбор подвижного состава, график подач и сопровождение до сдачи объекта.",
  },
];

// Вертикальные слайсы-аккордеон (board-2): раскрытый слайс показывает фото и
// описание, свёрнутые — повёрнутый заголовок. Мобайл: вертикальный стек.
export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-paper px-6 py-24 md:px-12 md:py-32">
      <p className="font-data text-xs uppercase tracking-[0.2em] text-cobalt">Услуги</p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-none tracking-tighter md:text-5xl">
        Пять способов увезти ваш груз
      </h2>

      {/* desktop: слайсы */}
      <div className="mt-14 hidden gap-3 lg:flex" style={{ minHeight: 560 }}>
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              className={`relative overflow-hidden border border-steel text-left transition-[flex-grow] duration-500 ease-out ${
                isActive ? "grow-[5]" : "grow"
              }`}
              style={{ flexBasis: 0 }}
            >
              {isActive ? (
                <div className="flex h-full flex-col">
                  <div className="relative min-h-0 flex-1">
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="border-t border-steel bg-paper p-6">
                    <div className="flex items-center gap-3">
                      <img src={s.icon} alt="" className="rts-icon h-10 w-10 object-contain" />
                      <h3 className="font-display text-2xl font-extrabold tracking-tight text-cobalt">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-ink/85">
                      {s.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-end justify-center pb-8 pt-8">
                  <span
                    className="whitespace-nowrap font-display text-2xl font-extrabold tracking-tight text-ink/80"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {s.title}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* mobile: стек-аккордеон */}
      <div className="mt-10 flex flex-col divide-y divide-steel border-y border-steel lg:hidden">
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          return (
            <div key={s.title}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={isActive}
                onClick={() => setActive(isActive ? -1 : i)}
              >
                <span className="font-display text-lg font-extrabold tracking-tight">
                  {s.title}
                </span>
                <span className="font-data text-cobalt" aria-hidden="true">
                  {isActive ? "−" : "+"}
                </span>
              </button>
              {isActive ? (
                <div className="pb-6">
                  <img src={s.image} alt={s.alt} className="w-full border border-steel object-cover" />
                  <p className="mt-4 text-base leading-relaxed text-ink/85">{s.text}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
