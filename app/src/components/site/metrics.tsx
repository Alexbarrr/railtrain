const METRICS = [
  { n: "9 288", unit: "км", note: "до Владивостока: самое дальнее чисто железнодорожное плечо" },
  { n: "5-10", unit: "суток", note: "ускоренными контейнерными поездами из Москвы до Сибири и Приморья" },
  { n: "с 2004", unit: "года", note: "работаем со всех станций Московской железной дороги" },
];

// Цифры как графика (oversized metrics strip) на кремовом поле.
export function Metrics() {
  return (
    <section className="border-t border-ink/20 bg-paper px-5 py-16 text-ink md:px-10 md:py-24" aria-label="Цифры">
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        {METRICS.map((m) => (
          <div key={m.n} className="border-l-2 border-ochre pl-6">
            <p className="font-display text-6xl font-black leading-none tracking-tight md:text-7xl">
              {m.n}
              <span className="ml-2 align-top font-data text-lg font-medium text-field">{m.unit}</span>
            </p>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink/70">{m.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
