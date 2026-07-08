
import { PRICES } from "../../content/site";

// Тарифы на чернильном поле (board v2), mono-цифры, строка подсвечивается охрой.
export function Pricing() {
  return (
    <section id="prices" className="bg-ink px-5 py-16 text-paper md:px-10 md:py-24">
      <p className="font-data text-xs uppercase tracking-[0.25em] text-ochre">Тарифы</p>
      <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
        Направления и цены
      </h2>
      <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-paper/70">
        Ориентировочная стоимость отправки контейнера из Москвы. Точный расчёт зависит от груза и
        габаритов: пришлите заявку, подберём состав и маршрут.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[540px] border-collapse">
          <thead>
            <tr className="border-b-2 border-paper/40 text-left">
              <th scope="col" className="py-3 pr-4 font-data text-xs font-medium uppercase tracking-[0.15em] text-paper/60">Станция назначения</th>
              <th scope="col" className="py-3 pr-4 text-right font-data text-xs font-medium uppercase tracking-[0.15em] text-paper/60">20 фут</th>
              <th scope="col" className="py-3 text-right font-data text-xs font-medium uppercase tracking-[0.15em] text-paper/60">40 фут</th>
            </tr>
          </thead>
          <tbody>
            {PRICES.map((r) => (
              <tr key={r.city} className="group border-b border-paper/15 transition-colors hover:bg-ochre hover:text-ink">
                <td className="py-3.5 pr-4 text-base font-medium">
                  {r.city}
                  {r.sea ? <span className="pl-1 text-ochre group-hover:text-ink">*</span> : null}
                </td>
                <td className="py-3.5 pr-4 text-right font-data text-base tabular-nums">{r.p20} ₽</td>
                <td className="py-3.5 text-right font-data text-base tabular-nums">{r.p40} ₽</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 font-data text-sm text-paper/50">
        * с морским или автомобильным плечом: фрахт и портовые работы уже в цене
      </p>
      <a href="/prices" className="mt-8 inline-block font-data text-sm text-ochre hover:text-paper">
        Подробнее о ценах и сроках →
      </a>
    </section>
  );
}
