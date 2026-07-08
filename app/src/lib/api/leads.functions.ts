import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().trim().min(1).max(200),
      phone: z.string().trim().max(50).optional().default(""),
      email: z.string().trim().max(200).optional().default(""),
      cargo: z.string().trim().min(1).max(2000),
    }),
  )
  .handler(async ({ data }) => {
    if (!data.phone && !data.email) {
      return { ok: false as const, error: "Укажите телефон или e-mail, чтобы мы могли ответить." };
    }
    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, error: "Форма временно недоступна. Позвоните нам: +7 (495) 943-61-69." };
    }
    await DB.prepare(
      "INSERT INTO leads (name, phone, email, cargo) VALUES (?1, ?2, ?3, ?4)",
    )
      .bind(data.name, data.phone, data.email, data.cargo)
      .run();
    return { ok: true as const };
  });
