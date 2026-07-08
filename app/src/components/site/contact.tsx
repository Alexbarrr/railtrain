import { useState } from "react";

import { ADDRESS, EMAIL, PHONE, PHONE_HREF, WHATSAPP, WHATSAPP_HREF } from "../../content/site";
import { submitLead } from "../../lib/api/leads.functions";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "done" }
  | { status: "error"; message: string };

// Контакты + заявка на зелёном поле. Submit: mono-readout, лейбл «печатается»
// стрелкой-кареткой на hover (гарнитура mono decode).
export function Contact({ id = "contact" }: { id?: string }) {
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
      setState({ status: "error", message: `Не получилось отправить. Позвоните нам: ${PHONE}.` });
    }
  }

  const inputCls =
    "w-full border-2 border-paper/35 bg-transparent px-4 py-3 text-base text-paper outline-none transition-colors placeholder:text-paper/35 focus:border-ochre";

  return (
    <section id={id} className="bg-field px-5 py-16 text-paper md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-data text-xs uppercase tracking-[0.25em] text-ochre">Контакты</p>
          <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
            Оставить заявку
          </h2>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="font-data text-xs uppercase tracking-[0.15em] text-paper/50">Телефон</dt>
              <dd className="mt-1">
                <a href={PHONE_HREF} className="font-display text-2xl font-bold tracking-tight hover:text-ochre">
                  {PHONE}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-data text-xs uppercase tracking-[0.15em] text-paper/50">WhatsApp, отследить контейнер</dt>
              <dd className="mt-1 font-data text-base">
                <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer" className="hover:text-ochre">
                  {WHATSAPP}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-data text-xs uppercase tracking-[0.15em] text-paper/50">E-mail</dt>
              <dd className="mt-1 font-data text-base">
                <a href={`mailto:${EMAIL}`} className="hover:text-ochre">{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="font-data text-xs uppercase tracking-[0.15em] text-paper/50">Адрес</dt>
              <dd className="mt-1 text-base leading-relaxed text-paper/85">{ADDRESS}</dd>
            </div>
          </dl>
        </div>

        {state.status === "done" ? (
          <div className="flex flex-col justify-center">
            <p className="font-display text-3xl font-black uppercase tracking-tight">Заявка принята</p>
            <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-paper/80">
              Менеджер посчитает стоимость и свяжется с вами в рабочее время. Если груз срочный,
              звоните: {PHONE}.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="grid gap-5">
              <label className="block">
                <span className="mb-1.5 block font-data text-xs uppercase tracking-[0.15em] text-paper/60">Имя</span>
                <input name="name" type="text" autoComplete="name" className={inputCls} />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-data text-xs uppercase tracking-[0.15em] text-paper/60">Телефон</span>
                  <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-data text-xs uppercase tracking-[0.15em] text-paper/60">E-mail</span>
                  <input name="email" type="email" autoComplete="email" className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block font-data text-xs uppercase tracking-[0.15em] text-paper/60">
                  Что перевозим и куда
                </span>
                <textarea
                  name="cargo"
                  rows={4}
                  placeholder="Например: 40-футовый контейнер, Москва → Владивосток"
                  className={`${inputCls} resize-y`}
                />
              </label>

              {fieldError ? <p className="font-data text-sm text-ochre">{fieldError}</p> : null}
              {state.status === "error" ? (
                <p className="font-data text-sm text-ochre">{state.message}</p>
              ) : null}

              <button
                type="submit"
                disabled={state.status === "sending"}
                className="group mt-2 w-full border-2 border-paper/50 px-7 py-4 text-left font-data text-base font-medium text-paper transition-colors hover:border-ochre hover:text-ochre disabled:opacity-60"
              >
                <span className="mr-2 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  ▸
                </span>
                {state.status === "sending" ? "отправляем…" : "рассчитать_перевозку"}
              </button>
              <p className="font-data text-xs leading-relaxed text-paper/45">
                Отправляя форму, вы соглашаетесь на обработку персональных данных.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
