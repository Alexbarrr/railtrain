import { useEffect, useRef } from "react";

const FRAME_COUNT = 101;
const frameSrc = (i: number) => `/frames/hero/f-${String(i + 1).padStart(3, "0")}.jpg`;

// Tier-1 механика (wow-catalog A1): скролл проигрывает сгенерированный фильм.
// Кадр 1 рисуется сразу (screenshot-safe), остальные догружаются потоком;
// пока кадр не готов, рисуем ближайший загруженный. Reduced motion: статичный
// финальный кадр, без пина. Мобайл: укороченный пин.
function drawCover(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width: cw, height: ch } = canvas;
  const s = Math.max(cw / img.width, ch / img.height);
  const w = img.width * s;
  const h = img.height * s;
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pin = pinRef.current;
    if (!canvas || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sizeCanvas = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };
    sizeCanvas();

    const frames: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null);
    let current = 0;

    const paint = (idx: number) => {
      let img = frames[idx];
      if (!img) {
        for (let d = 1; d < FRAME_COUNT && !img; d++) {
          img = frames[idx - d] ?? frames[idx + d] ?? null;
        }
      }
      if (img) drawCover(canvas, img);
    };

    const load = (idx: number, onload?: () => void) => {
      const img = new Image();
      img.src = frameSrc(idx);
      img.onload = () => {
        frames[idx] = img;
        onload?.();
      };
    };

    if (reduced) {
      // Статичный финальный кадр, никакого пина.
      load(FRAME_COUNT - 1, () => paint(FRAME_COUNT - 1));
      return;
    }

    load(0, () => paint(0));
    for (let i = 1; i < FRAME_COUNT; i++) load(i, () => { if (i === current) paint(i); });

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const st = ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: isMobile ? "+=150%" : "+=250%",
          pin: true,
          // Следующая секция наезжает на закреплённый слой: без пустой полосы
          // от pin-spacer в полностраничном скриншоте.
          pinSpacing: false,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              FRAME_COUNT - 1,
              Math.round(self.progress * (FRAME_COUNT - 1)),
            );
            if (idx !== current) {
              current = idx;
              paint(idx);
            }
          },
        });

        // Сборка заголовка при монтировании (не по вьюпорту).
        if (textRef.current) {
          gsap.from(textRef.current.children, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          });
        }

        // Магнитная стрелка CTA: едет по «маршрутной» пунктирной линии внутри кнопки.
        let ctaCleanup: (() => void) | undefined;
        const cta = ctaRef.current;
        if (cta) {
          const arrow = cta.querySelector<HTMLElement>("[data-arrow]");
          if (arrow) {
            const xTo = gsap.quickTo(arrow, "x", { duration: 0.4, ease: "power3.out" });
            const over = () => xTo(10);
            const out = () => xTo(0);
            cta.addEventListener("pointerenter", over);
            cta.addEventListener("pointerleave", out);
            ctaCleanup = () => {
              cta.removeEventListener("pointerenter", over);
              cta.removeEventListener("pointerleave", out);
            };
          }
        }

        const onResize = () => {
          sizeCanvas();
          paint(current);
        };
        window.addEventListener("resize", onResize);

        cleanup = () => {
          window.removeEventListener("resize", onResize);
          ctaCleanup?.();
          st.kill();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section id="hero" aria-label="Главный экран">
      <div
        ref={pinRef}
        className="relative h-dvh min-h-[560px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/hero.jpg)" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        {/* Затемнение под текстом, чтобы крем читался на любом кадре */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

        {/* Маршрутная линия с вехами: мотив путевого листа */}
        <div className="absolute inset-x-0 top-20 px-6 md:px-12" aria-hidden="true">
          <div className="relative border-t border-steel/60">
            {[0, 20, 40, 60, 80, 100].map((p) => (
              <span
                key={p}
                className="absolute -top-[3px] h-[6px] w-px bg-steel/70"
                style={{ left: `${p}%` }}
              />
            ))}
            <span className="absolute -top-[4px] left-0 h-2 w-2 rounded-full bg-cobalt" />
          </div>
        </div>

        <div
          ref={textRef}
          className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-6 px-6 pb-14 md:px-12 md:pb-20"
        >
          <h1 className="max-w-4xl font-display text-4xl font-black leading-none tracking-tighter text-paper md:text-6xl">
            ЖД перевозки грузов
            <br />
            из Москвы по всей России
          </h1>
          <p className="max-w-[46ch] text-base leading-relaxed text-paper/85">
            Контейнеры, вагоны, негабарит и автомобили: принимаем груз на складе
            и сдаём получателю на станции назначения.
          </p>
          <div className="flex flex-wrap items-center">
            <a
              ref={ctaRef}
              href="#contact"
              className="group relative inline-flex items-center gap-4 bg-cobalt px-7 py-4 text-base font-semibold text-paper transition-transform active:scale-[0.98]"
            >
              Рассчитать перевозку
              {/* стрелка едет по пунктирному «маршруту» внутри кнопки */}
              <span className="relative inline-flex w-10 items-center" aria-hidden="true">
                <span className="absolute inset-x-0 border-t border-dashed border-paper/50" />
                <span data-arrow className="relative translate-x-0 transition-transform">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
