const QUOTES = [
  {
    text: "Очень полезной оказалась услуга «от двери к двери»: не пришлось искать машины для перевозки груза на станцию, что сэкономило и время, и деньги.",
    who: "ИП Виклюк",
    what: "отправка сборного груза",
  },
  {
    text: "Нужно было перевезти машину из Москвы. Вышло быстро и выгодно, груз застрахован, автомобиль получил чётко в срок, без задержек.",
    who: "В. Р. Климов",
    what: "перевозка автомобиля",
  },
  {
    text: "Неоднократно прибегали к услугам, и каждый раз груз приходил в срок и в отличном состоянии. Сотрудники бережно относятся к грузу.",
    who: "ООО ВанСвет",
    what: "регулярные отправки",
  },
];

// Отзывы: редакционные колонки без карточек, divide-y, охра только в атрибуции.
export function Quotes() {
  return (
    <section className="border-t border-ink/20 bg-paper px-5 py-16 text-ink md:px-10 md:py-24">
      <h2 className="break-words font-display text-3xl font-black uppercase leading-none tracking-tight md:text-6xl">
        Отзывы
      </h2>
      <div className="mt-10 divide-y divide-ink/15">
        {QUOTES.map((q) => (
          <figure key={q.who} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
            <blockquote className="text-lg leading-relaxed md:col-span-8 md:text-xl">«{q.text}»</blockquote>
            <figcaption className="font-data text-sm md:col-span-4 md:justify-self-end md:text-right">
              <span className="block font-bold text-field">{q.who}</span>
              <span className="text-ink/60">{q.what}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
