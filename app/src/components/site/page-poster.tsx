import { withBase } from "../../lib/base";

// Плакатная шапка контентной страницы (board v2): цветное поле, гигантский H1,
// хлебная крошка охрой, документальная фото-марка справа.
export function PagePoster({
  h1,
  crumb,
  photo,
  field = "green",
  facts,
}: {
  h1: string;
  crumb?: string;
  photo?: string;
  field?: "green" | "ink";
  facts?: Array<{ label: string }>;
}) {
  const band = field === "ink" ? "bg-ink" : "bg-field";
  return (
    <section className={`${band} px-5 pb-10 pt-14 text-paper md:px-10 md:pb-14 md:pt-20`}>
      <nav className="font-data text-xs text-ochre" aria-label="Хлебные крошки">
        <a href={withBase("/")} className="hover:underline">Главная</a>
        {crumb ? <span className="text-paper/50"> / {crumb}</span> : null}
      </nav>
      <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h1 className="max-w-5xl font-display text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-6xl" style={{ hyphens: "auto", overflowWrap: "break-word" }}>
          {h1}
        </h1>
        {photo ? (
          <div className="stamp w-56 shrink-0 rotate-2 md:w-64">
            <img src={photo} alt="" className="block aspect-[4/3] w-full object-cover" />
          </div>
        ) : null}
      </div>
      {facts && facts.length ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {facts.map((f) => (
            <span key={f.label} className="border-2 border-paper/30 px-4 py-2 font-display text-base font-bold uppercase tracking-tight md:px-5 md:py-3 md:text-2xl">
              {f.label}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
