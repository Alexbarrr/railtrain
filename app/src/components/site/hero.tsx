import { useEffect, useRef } from "react";

// Tier-1: плакатный параллакс-риг (wow-catalog B1, cutout parallax).
// Три слоя: зелёное поле с типографикой → панорама-плакат (медленный слой) →
// вырезанный поезд, который едет на восток, пока пользователь скроллит.
// Только transform (скриншот-безопасно). Reduced motion: статичная композиция.
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const root = rootRef.current;
      const lines = root.querySelectorAll("[data-line]");
      const train = root.querySelector("[data-train]");
      const pan = root.querySelector("[data-pan]");
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      // Сборка при монтировании: заголовок поднимается, поезд въезжает слева.
      const intro = gsap.timeline();
      intro
        .from(lines, { y: 64, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" })
        .from(train, { x: isMobile ? "-30vw" : "-18vw", duration: 1.6, ease: "power2.out" }, "<");

      // Скролл: поезд едет на восток, панорама отстаёт (глубина).
      const st = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.7 },
      });
      st.to(train, { x: isMobile ? "16vw" : "34vw", ease: "none" }, 0)
        .to(pan, { y: 40, ease: "none" }, 0)
        .to(lines, { y: -30, ease: "none" }, 0);

      // Лёгкий курсорный параллакс слоёв (десктоп).
      let moveCleanup: (() => void) | undefined;
      if (!isMobile && train && pan) {
        const trainTo = gsap.quickTo(train, "y", { duration: 0.6, ease: "power2.out" });
        const panTo = gsap.quickTo(pan, "rotation", { duration: 0.8, ease: "power2.out" });
        const onMove = (e: PointerEvent) => {
          const r = (e.clientY / window.innerHeight - 0.5) * 2;
          trainTo(r * -6);
          panTo(r * -0.15);
        };
        window.addEventListener("pointermove", onMove);
        moveCleanup = () => window.removeEventListener("pointermove", onMove);
      }

      cleanup = () => {
        intro.kill();
        st.scrollTrigger?.kill();
        st.kill();
        moveCleanup?.();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[88dvh] flex-col overflow-hidden bg-field text-paper">
      <div className="relative z-10 px-5 pt-14 md:px-10 md:pt-20">
        <h1 className="font-display font-black uppercase leading-[0.98] tracking-tight">
          <span data-line className="block text-[11vw] md:text-[6.5vw]">Грузы едут</span>
          <span data-line className="block text-[11vw] md:text-[6.5vw]">
            на восток<span className="text-ochre">.</span>
          </span>
        </h1>
        <div data-line className="mt-6 flex flex-col items-start gap-7 md:mt-8 md:flex-row md:items-center md:gap-10">
          <p className="max-w-[44ch] text-base leading-relaxed text-paper/85 md:text-lg">
            ЖД перевозки грузов из Москвы по всей России: контейнеры, вагоны, негабарит и автомобили.
          </p>
          {/* CTA-билет: перфорация слева, «отрывается» на hover */}
          <a
            href="/contacts"
            className="ticket-edge group inline-flex shrink-0 items-center gap-3 bg-ochre py-4 pl-7 pr-6 text-base font-bold text-ink transition-transform duration-200 hover:-rotate-1 hover:translate-x-1 active:scale-[0.97] md:py-5 md:pl-8 md:pr-7 md:text-lg"
          >
            <span className="border-l-2 border-dashed border-ink/40 pl-4 md:pl-5">Рассчитать перевозку</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
          </a>
        </div>
      </div>

      {/* панорама-плакат: медленный слой */}
      <div className="pointer-events-none relative mt-10 w-full grow md:mt-6">
        <img
          data-pan
          src="/assets/panorama.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-bottom"
        />
        {/* поезд: вырезанный слой, едет на восток */}
        <img
          data-train
          src="/assets/train.png"
          alt="Контейнерный состав идёт на восток"
          className="absolute bottom-[6.5%] left-0 w-[130%] max-w-none md:w-[62%]"
        />
        <div className="min-h-[34vh] md:min-h-[42vh]" aria-hidden="true" />
      </div>
    </section>
  );
}
