import { withBase } from "../../lib/base";

// Полоса-CTA в конце контентных страниц: плакатная строка со стрелкой.
export function CtaBand() {
  return (
    <a
      href={withBase("/contacts")}
      className="group flex items-center justify-between gap-6 border-t-2 border-ink/30 bg-field px-5 py-8 text-paper transition-colors hover:bg-ochre hover:text-ink md:px-10 md:py-10"
    >
      <span className="font-display text-2xl font-black uppercase leading-none tracking-tight md:text-4xl">
        Рассчитать перевозку
      </span>
      <span aria-hidden="true" className="font-display text-3xl transition-transform duration-300 group-hover:translate-x-3 md:text-4xl">
        →
      </span>
    </a>
  );
}
