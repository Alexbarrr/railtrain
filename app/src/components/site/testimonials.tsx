// Стена цитат (board-6): асимметричная сетка, одна карточка инвертирована,
// внизу слева дуотон-фото. Отзывы реальные, со старого сайта rtrain.ru.
export function Testimonials() {
  return (
    <section id="reviews" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <h2 className="font-display text-4xl font-black leading-none tracking-tighter md:text-5xl">
        Отзывы
      </h2>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <figure className="border border-steel p-8">
          <span className="font-display text-6xl font-black leading-none text-cobalt" aria-hidden="true">
            «
          </span>
          <blockquote className="mt-2 text-lg leading-relaxed text-ink/90">
            Очень полезной оказалась услуга «от двери к двери»: не пришлось
            искать машины для перевозки груза на станцию, что сэкономило и
            время, и деньги.
          </blockquote>
          <figcaption className="mt-6 font-data text-sm text-ink/70">ИП Виклюк, отправка сборного груза</figcaption>
        </figure>

        <figure className="bg-ink p-8 text-paper">
          <span className="font-display text-6xl font-black leading-none text-cobalt" aria-hidden="true">
            «
          </span>
          <blockquote className="mt-2 text-lg leading-relaxed text-paper/90">
            Нужно было перевезти машину из Москвы. Вышло быстро и выгодно, груз
            застрахован, автомобиль получил чётко в срок, без задержек.
          </blockquote>
          <figcaption className="mt-6 font-data text-sm text-paper/70">В. Р. Климов, перевозка автомобиля</figcaption>
        </figure>

        <div className="relative hidden min-h-[220px] overflow-hidden border border-steel lg:block">
          <img
            src="/assets/yard.jpg"
            alt="Локомотив с контейнерным составом на путях в утреннем тумане"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "grayscale(0.35) sepia(0.08) hue-rotate(190deg) saturate(0.9)" }}
          />
        </div>

        <figure className="border border-steel p-8">
          <span className="font-display text-6xl font-black leading-none text-cobalt" aria-hidden="true">
            «
          </span>
          <blockquote className="mt-2 text-lg leading-relaxed text-ink/90">
            Неоднократно прибегали к услугам, и каждый раз груз приходил в срок
            и в отличном состоянии. Сотрудники бережно относятся к грузу, для
            нашей компании это необходимо.
          </blockquote>
          <figcaption className="mt-6 font-data text-sm text-ink/70">ООО ВанСвет, регулярные отправки</figcaption>
        </figure>
      </div>
    </section>
  );
}
