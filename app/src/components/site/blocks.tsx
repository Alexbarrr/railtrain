// Рендер блочного контента со старого сайта (app/src/content/pages.json).
// Тексты сохраняются как есть (SEO); стилизация редакционная.

export type Block =
  | { t: "h2" | "h3" | "h4"; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; items: string[] }
  | { t: "table"; rows: string[][] };

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} className="mt-12 font-display text-2xl font-black uppercase leading-tight tracking-tight text-field first:mt-0 md:text-3xl">
                {b.x}
              </h2>
            );
          case "h3":
          case "h4":
            return (
              <h3 key={i} className="mt-10 font-display text-xl font-bold leading-tight tracking-tight first:mt-0">
                {b.x}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-0.5 shrink-0 font-data text-ochre" aria-hidden="true">→</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse">
                  <tbody>
                    {b.rows.map((row, ri) => (
                      <tr key={ri} className={ri === 0 ? "border-b-2 border-ink/50" : "border-b border-ink/15"}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={
                              ri === 0
                                ? "py-3 pr-4 font-data text-xs font-medium uppercase tracking-wide text-ink/70"
                                : ci === 0
                                  ? "py-3 pr-4 text-base font-medium"
                                  : "py-3 pr-4 font-data text-base tabular-nums"
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={i} className="mt-5 text-base leading-relaxed text-ink/90">
                {(b as { x: string }).x}
              </p>
            );
        }
      })}
    </div>
  );
}
