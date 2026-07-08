import { useState } from "react";

import { submitLead } from "../../lib/api/leads.functions";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "done" }
  | { status: "error"; message: string };

// Framed panel (board-7): рамка на бумаге, внутри чернильное поле; слева
// реквизиты с маршрутной линией, справа форма. Сабмит: контурный блок,
// заливающийся кобальтом слева направо (гарнитура flood-fill, одна на страницу).
export function Contact() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const cargo = String(fd.get("cargo") ?? "").trim();

    if (!name) return setFieldError("Укажите имя.");
    if (!phone && !email) return setFieldError("Оставьте телефон или e-mail для ответа.");
    if (!cargo) return setFieldError("Коротко опишите груз и направление.");
    setFieldError(null);

    setState({ status: "sending" });
    try {
      const res = await submitLead({ data: { name, phone, email, cargo } });
      if (res.ok) {
        setState({ status: "done" });
        form.reset();
      } else {
        setState({ status: "error", message: res.error });
      }
    } catch {
      setState({
        status: "error",
        message: "Не получилось отправить. Позвоните нам: +7 (495) 943-61-69.",
      });
    }
  }

  return (
    <section id="contact" className="bg-paper px-6 py-24 md:px-12 md:py-32">
      <div className="border border-ink p-2 md:p-3">
        <div className="grid gap-10 bg-ink p-8 text-paper md:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-data text-xs uppercase tracking-[0.2em] text-steel">Контакты</p>
            <h2 className="mt-4 font-display text-4xl font-black leading-none tracking-tighter md:text-5xl">
              Оставить заявку
            </h2>
            <dl className="mt-10 space-y-5 font-data text-base">
              <div>
                <dt className="text-sm text-steel">Телефон</dt>
                <dd>
                  <a href="tel:+74959436169" className="transition-colors hover:text-steel">
                    +7 (495) 943-61-69
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-steel">WhatsApp, отследить контейнер</dt>
                <dd>
                  <a
                    href="https://api.whatsapp.com/send?phone=79015936169"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dashed decoration-steel/60 underline-offset-4 transition-colors hover:text-steel"
                  >
                    +7 (901) 593-61-69
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-steel">E-mail</dt>
                <dd>
                  <a href="mailto:info@rtrain.ru" className="transition-colors hover:text-steel">
                    info@rtrain.ru
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-steel">Адрес</dt>
                <dd className="leading-relaxed">
                  111024, Москва, ш. Энтузиастов, д. 5<br />
                  метро Римская
                </dd>
              </div>
            </dl>
            {/* маршрутная линия к вехе: мотив путевого листа */}
            <div className="relative mt-10 hidden max-w-xs lg:block" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 border-t border-steel/50" />
              <span className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-cobalt" />
            </div>
          </div>

          {state.status === "done" ? (
            <div className="flex flex-col justify-center">
              <p className="font-display text-3xl font-extrabold tracking-tight">
                Заявка принята
              </p>
              <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-paper/80">
                Менеджер посчитает стоимость и свяжется с вами в рабочее время.
                Если груз срочный, звоните: +7 (495) 943-61-69.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-1.5 block font-data text-sm text-steel">Имя</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="w-full border border-paper/40 bg-transparent px-4 py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                  />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-data text-sm text-steel">Телефон</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="w-full border border-paper/40 bg-transparent px-4 py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-data text-sm text-steel">E-mail</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full border border-paper/40 bg-transparent px-4 py-3 text-base text-paper outline-none transition-colors focus:border-paper"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block font-data text-sm text-steel">
                    Что перевозим и куда
                  </span>
                  <textarea
                    name="cargo"
                    rows={4}
                    placeholder="Например: 40-футовый контейнер, Москва → Владивосток"
                    className="w-full resize-y border border-paper/40 bg-transparent px-4 py-3 text-base text-paper outline-none transition-colors placeholder:text-paper/40 focus:border-paper"
                  />
                </label>

                {fieldError ? (
                  <p className="font-data text-sm text-steel">{fieldError}</p>
                ) : null}
                {state.status === "error" ? (
                  <p className="font-data text-sm text-steel">{state.message}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={state.status === "sending"}
                  className="group relative mt-2 w-full overflow-hidden border border-paper px-7 py-4 text-base font-semibold text-paper transition-colors disabled:opacity-60"
                >
                  <span className="absolute inset-y-0 left-0 w-0 bg-cobalt transition-[width] duration-300 ease-out group-hover:w-full" aria-hidden="true" />
                  <span className="relative">
                    {state.status === "sending" ? "Отправляем…" : "Рассчитать перевозку"}
                  </span>
                </button>
                <p className="font-data text-xs leading-relaxed text-paper/50">
                  Отправляя форму, вы соглашаетесь на обработку персональных данных.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
