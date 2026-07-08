import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Contact } from "../components/site/contact";
import { Footer } from "../components/site/footer";
import { GalleryPreview } from "../components/site/gallery-preview";
import { Hero } from "../components/site/hero";
import { Metrics } from "../components/site/metrics";
import { Nav } from "../components/site/nav";
import { Pricing } from "../components/site/pricing";
import { ServiceBands } from "../components/site/service-bands";
import { SmoothScroll } from "../components/site/smooth-scroll";
import { Quotes } from "../components/site/quotes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Перевозка грузов из Москвы по России ЖД транспортом. Выгодные цены. Широкая география перевозок - Рейл Трейн Сервис | Rail Train Service" },
      { name: "description", content: "Перевозка грузов по России ЖД транспортом - Рейл Трейн Сервис" },
    ],
  }),
  component: Index,
});

function Index() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Ревилы заголовков секций: только transform (скриншот-безопасно).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !mainRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const headings = mainRef.current.querySelectorAll("section h2");
      const tweens = Array.from(headings).map((h) =>
        gsap.from(h, {
          y: 48,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: h, start: "top 90%" },
        }),
      );
      cleanup = () =>
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-paper font-body text-ink">
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <ServiceBands />
        <Metrics />
        <Pricing />
        <GalleryPreview />
        <Quotes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
