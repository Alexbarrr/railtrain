import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Contact } from "../components/site/contact";
import { Footer } from "../components/site/footer";
import { Geography } from "../components/site/geography";
import { Hero } from "../components/site/hero";
import { Included } from "../components/site/included";
import { Nav } from "../components/site/nav";
import { Pricing } from "../components/site/pricing";
import { Services } from "../components/site/services";
import { SmoothScroll } from "../components/site/smooth-scroll";
import { Testimonials } from "../components/site/testimonials";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Скролл-ревилы заголовков секций: только transform (screenshot-safe,
  // никакого opacity-0 в ожидании вьюпорта), с reduced-motion фолбэком.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !mainRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const headings = mainRef.current.querySelectorAll("section h2");
        const tweens = Array.from(headings).map((h) =>
          gsap.from(h, {
            y: 56,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 88%" },
          }),
        );
        cleanup = () =>
          tweens.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
      },
    );

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
        {/* relative + фон: секции наезжают на запиненный hero (pinSpacing: false) */}
        <div className="relative z-10">
          <Services />
          <Geography />
          <Pricing />
          <Included />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
