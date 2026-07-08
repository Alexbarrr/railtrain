const WAYPOINTS = [
  { city: "Москва", days: "старт", km: "0 км" },
  { city: "Новосибирск", days: "5 суток", km: "3 335 км" },
  { city: "Красноярск", days: "6 суток", km: "4 098 км" },
  { city: "Иркутск", days: "6 суток", km: "5 185 км" },
  { city: "Улан-Удэ", days: "7 суток", km: "5 640 км" },
  { city: "Чита", days: "8 суток", km: "6 199 км" },
  { city: "Хабаровск", days: "9 суток", km: "8 521 км" },
  { city: "Владивосток", days: "10 суток", km: "9 288 км" },
  { city: "Южно-Сахалинск", days: "15-25 суток", km: "морское плечо" },
  { city: "Петропавловск-Камчатский", days: "18-35 суток", km: "морское плечо" },
  { city: "Магадан", days: "21-35 суток", km: "морское плечо" },
];

// Горизонтальная лента-маршрут (board-3): вехи-станции с днями пути,
// oversized numeral как структурный элемент (second-read moment страницы).
export function Geography() {
  return (
    <section
      id="geography"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        backgroundImage: "url(/assets/plate-map.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-6 md:px-12">
        <h2 className="max-w-3xl font-display text-4xl font-black leading-none tracking-tighter md:text-5xl">
          Возим по всем станциям России
        </h2>
        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink/85">
          Куда железная дорога не доходит, довозим автотранспортом или морем:
          Сахалин, Камчатка, Магадан и Чукотка тоже в зоне доставки.
        </p>
        <div className="mt-12 flex items-end gap-6">
          <span className="font-display text-7xl font-black leading-none tracking-tighter text-ink md:text-9xl">
            9 288
          </span>
          <span className="pb-2 font-data text-sm text-ink/70 md:text-base">
            км до Владивостока:
            <br />
            самое дальнее чисто железнодорожное плечо
          </span>
        </div>
      </div>

      {/* лента маршрута: горизонтальный скролл со станциями */}
      <div className="mt-14 overflow-x-auto pb-6" role="list" aria-label="Основные станции маршрута">
        <div className="flex min-w-max items-stretch px-6 md:px-12">
          {WAYPOINTS.map((w, i) => (
            <div key={w.city} role="listitem" className="relative w-44 shrink-0 pr-4 md:w-52">
              {/* линия маршрута */}
              <div className="relative h-3">
                <span className="absolute inset-x-0 top-1 border-t-2 border-cobalt" aria-hidden="true" />
                <span
                  className={`absolute top-0 h-2.5 w-2.5 rounded-full ${
                    i === 0 || i === WAYPOINTS.length - 1 ? "bg-cobalt" : "border-2 border-cobalt bg-paper"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 pr-2 font-display text-lg font-extrabold leading-tight tracking-tight">
                {w.city}
              </p>
              <p className="mt-2 font-data text-sm text-cobalt">{w.days}</p>
              <p className="font-data text-xs text-ink/60">{w.km}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
