import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().max(40).optional().or(z.literal("")),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  tipoProjeto: z.string().trim().max(80).optional().or(z.literal("")),
  faixaInvestimento: z.string().trim().max(80).optional().or(z.literal("")),
  mensagem: z.string().trim().min(10, "Conte um pouco mais").max(2000),
});

export type ContatoInput = z.infer<typeof contatoSchema>;

export const enviarContato = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contatoSchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("contact_messages").insert({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone || null,
      empresa: data.empresa || null,
      tipo_projeto: data.tipoProjeto || null,
      faixa_investimento: data.faixaInvestimento || null,
      mensagem: data.mensagem,
    });

    if (error) {
      console.error("[contato] insert failed", error.message);
      return { ok: false as const, erro: "Não foi possível enviar agora." };
    }
    return { ok: true as const };
  });
