const PRICES: Array<{ city: string; p20: string; p40: string; sea?: boolean }> = [
  { city: "Новосибирск", p20: "54 200", p40: "79 500" },
  { city: "Красноярск", p20: "56 500", p40: "101 000" },
  { city: "Иркутск (Батарейная)", p20: "74 500", p40: "123 500" },
  { city: "Улан-Удэ (Тальцы)", p20: "81 900", p40: "169 500" },
  { city: "Чита", p20: "86 200", p40: "165 500" },
  { city: "Благовещенск", p20: "86 500", p40: "166 400" },
  { city: "Хабаровск", p20: "92 000", p40: "141 000" },
  { city: "Владивосток", p20: "85 000", p40: "139 000" },
  { city: "Беркакит", p20: "94 000", p40: "198 000" },
  { city: "Якутск", p20: "161 300", p40: "283 500", sea: true },
  { city: "Южно-Сахалинск", p20: "127 000", p40: "217 000", sea: true },
  { city: "Петропавловск-Камчатский", p20: "140 500", p40: "231 000", sea: true },
  { city: "Магадан", p20: "146 500", p40: "249 000", sea: true },
];

// Швейцарская таблица на чернильном поле (board-4). Полоса-CTA внизу:
// весь бэнд инвертируется на hover (гарнитура «row/band shift»).
export function Pricing() {
  return (
    <section id="prices" className="relative z-10 bg-ink py-24 text-paper md:py-32">
      <div className="px-6 md:px-12">
        <p className="font-data text-xs uppercase tracking-[0.2em] text-steel">Тарифы</p>
        <h2 className="mt-4 font-display text-4xl font-black leading-none tracking-tighter md:text-5xl">
          Направления и цены
        </h2>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-paper/80">
          Ориентировочная стоимость отправки контейнера из Москвы. Точный расчёт
          зависит от груза, габаритов и способа доставки: пришлите заявку, и мы
          подберём состав и маршрут.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-paper/30 text-left">
                <th scope="col" className="py-3 pr-4 font-data text-xs font-medium uppercase tracking-[0.15em] text-steel">
                  Станция назначения
                </th>
                <th scope="col" className="py-3 pr-4 text-right font-data text-xs font-medium uppercase tracking-[0.15em] text-steel">
                  20 фут
                </th>
                <th scope="col" className="py-3 text-right font-data text-xs font-medium uppercase tracking-[0.15em] text-steel">
                  40 фут
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map((r) => (
                <tr key={r.city} className="border-b border-paper/15 transition-colors hover:bg-paper/5">
                  <td className="py-4 pr-4 text-base">
                    {r.city}
                    {r.sea ? <span className="pl-1 text-steel">*</span> : null}
                  </td>
                  <td className="py-4 pr-4 text-right font-data text-base tabular-nums">{r.p20} ₽</td>
                  <td className="py-4 text-right font-data text-base tabular-nums">{r.p40} ₽</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 font-data text-sm text-paper/60">
          * с морским или автомобильным плечом: фрахт и портовые работы уже в цене
        </p>
      </div>

      <a
        href="#contact"
        className="group mt-14 flex items-center justify-between border-y border-paper/25 px-6 py-6 transition-colors duration-300 hover:bg-paper hover:text-ink md:px-12"
      >
        <span className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Рассчитать перевозку
        </span>
        <span className="font-display text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-3xl" aria-hidden="true">
          →
        </span>
      </a>
    </section>
  );
}
