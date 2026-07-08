import { useEffect, useRef } from "react";

// Tier-1 (wow-catalog D3): kinetic type opener. Строки заголовка едут по разным
// «путям» на скролле (только transform, скриншот-безопасно), призрачная цифра
// движется медленнее. Reduced motion: статичная композиция.

// Орнамент «путь»: шпалы + рельс, чистый CSS.
function RailTicks({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`hidden h-[0.55em] min-w-[2em] flex-1 self-center md:block ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, transparent calc(50% - 1px), currentColor calc(50% - 1px), currentColor calc(50% + 1px), transparent calc(50% + 1px)), repeating-linear-gradient(90deg, currentColor 0 8px, transparent 8px 26px)",
      }}
    />
  );
}

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const root = rootRef.current;
      const l1 = root.querySelector("[data-line1]");
      const l2 = root.querySelector("[data-line2]");
      const ghost = root.querySelector("[data-ghost]");
      const stamp = root.querySelector("[data-stamp]");

      // Сборка при монтировании: строки съезжаются как составы
      const intro = gsap.timeline();
      intro
        .from(l1, { x: -80, duration: 1, ease: "power3.out" })
        .from(l2, { x: 80, duration: 1, ease: "power3.out" }, "<")
        .from(stamp, { y: -30, rotate: 8, duration: 0.9, ease: "power2.out" }, "<0.15");

      // Скролл: строки продолжают движение по своим путям
      const st = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      st.to(l1, { x: -120, ease: "none" }, 0)
        .to(l2, { x: 120, ease: "none" }, 0)
        .to(ghost, { x: -60, ease: "none" }, 0)
        .to(stamp, { y: 60, rotate: 5, ease: "none" }, 0);

      cleanup = () => {
        intro.kill();
        st.scrollTrigger?.kill();
        st.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-field text-paper">
      {/* призрачная цифра */}
      <div
        data-ghost
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[22vw] font-black leading-none text-paper/[0.07] md:text-[16vw]"
      >
        9 288 км
      </div>

      {/* фото-марка */}
      <div
        data-stamp
        className="stamp absolute right-5 top-10 hidden w-52 rotate-3 lg:block xl:w-64"
      >
        <img
          src="/gallery/pogruzka-v-vagony-tsmgv/IMG_1572.jpg"
          alt="Погрузка груза в вагон на терминале"
          className="block w-full"
          style={{ filter: "sepia(0.25) hue-rotate(100deg) saturate(0.75)" }}
        />
      </div>

      <div className="relative px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
        <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight">
          <span data-line1 className="flex items-center gap-6 text-[11.5vw] md:text-[7.5vw]">
            <RailTicks className="text-paper/60" />
            <span className="whitespace-nowrap">Грузы едут</span>
          </span>
          <span data-line2 className="flex items-center gap-6 text-[11.5vw] md:text-[7.5vw]">
            <span className="whitespace-nowrap">на восток</span>
            <RailTicks className="text-paper/60" />
          </span>
        </h1>
        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-paper/85 md:text-xl">
          ЖД перевозки грузов из Москвы по всей России: контейнеры, вагоны, негабарит и автомобили.
        </p>

        {/* CTA-билет: перфорация слева, «отрывается» на hover */}
        <a
          href="/contacts"
          className="ticket-edge group mt-10 inline-flex items-center gap-4 bg-ochre py-5 pl-8 pr-7 text-lg font-bold text-ink transition-transform duration-200 hover:-rotate-1 hover:translate-x-1 active:scale-[0.97]"
        >
          <span className="border-l-2 border-dashed border-ink/40 pl-5">Рассчитать перевозку</span>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
        </a>
      </div>
    </section>
  );
}
