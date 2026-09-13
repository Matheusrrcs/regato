import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { empresa, tiposProjeto, faixasInvestimento } from "@/lib/site-data";
import { enviarContato } from "@/lib/contato.functions";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Regato" },
      {
        name: "description",
        content:
          "Conte o que você precisa: site, identidade visual ou design digital. Respondemos em até 1 dia útil com próximos passos, prazo e investimento.",
      },
      { property: "og:title", content: "Contato — Regato" },
      {
        property: "og:description",
        content:
          "Conte o que você precisa: site, identidade visual ou design digital. Respondemos em até 1 dia útil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/20";

function ContatoPage() {
  const enviar = useServerFn(enviarContato);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      tipoProjeto: String(fd.get("tipoProjeto") ?? ""),
      faixaInvestimento: String(fd.get("faixaInvestimento") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };

    setEnviando(true);
    setErros({});
    try {
      const res = await enviar({ data: payload });
      if (res.ok) {
        setEnviado(true);
        toast.success("Mensagem enviada com sucesso!");
      } else {
        toast.error(res.erro ?? "Não foi possível enviar agora.");
      }
    } catch (err: unknown) {
      const issues = (err as { issues?: { path: (string | number)[]; message: string }[] })?.issues;
      if (Array.isArray(issues)) {
        const mapa: Record<string, string> = {};
        for (const i of issues) mapa[String(i.path[0])] = i.message;
        setErros(mapa);
      } else {
        toast.error("Verifique os campos e tente novamente.");
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="eyebrow rise-in">Contato</p>
        <h1 className="rise-in mt-4 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          Vamos colocar a sua ideia em movimento
        </h1>
        <p className="rise-in mt-6 max-w-2xl text-lg text-muted-foreground">
          Conte o que você precisa. Respondemos em até 1 dia útil com os próximos
          passos, prazo e faixa de investimento.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {enviado ? (
              <div className="surface-cream flex flex-col items-center rounded-2xl px-8 py-20 text-center">
                <CheckCircle2 className="h-12 w-12 text-olive" />
                <h2 className="mt-6 text-2xl font-bold">Mensagem enviada!</h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Obrigado pelo contato. Respondemos em até 1 dia útil no e-mail
                  informado. Se preferir, chame no WhatsApp.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/${empresa.whatsapp}`}
                    className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-cream-foreground hover:opacity-90"
                  >
                    Falar no WhatsApp
                  </a>
                  <Link
                    to="/portfolio"
                    className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary"
                  >
                    Ver portfólio
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">
                      Nome *
                    </label>
                    <input id="nome" name="nome" required className={inputClass} placeholder="Seu nome" />
                    {erros.nome && <p className="mt-1 text-xs text-destructive">{erros.nome}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                      E-mail *
                    </label>
                    <input id="email" name="email" type="email" required className={inputClass} placeholder="voce@empresa.com" />
                    {erros.email && <p className="mt-1 text-xs text-destructive">{erros.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium">
                      Telefone / WhatsApp
                    </label>
                    <input id="telefone" name="telefone" type="tel" className={inputClass} placeholder="(11) 98888-0000" />
                  </div>
                  <div>
                    <label htmlFor="empresa" className="mb-1.5 block text-sm font-medium">
                      Empresa
                    </label>
                    <input id="empresa" name="empresa" className={inputClass} placeholder="Nome da empresa" />
                  </div>
                  <div>
                    <label htmlFor="tipoProjeto" className="mb-1.5 block text-sm font-medium">
                      Tipo de projeto
                    </label>
                    <select id="tipoProjeto" name="tipoProjeto" className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Selecione
                      </option>
                      {tiposProjeto.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="faixaInvestimento" className="mb-1.5 block text-sm font-medium">
                      Faixa de investimento
                    </label>
                    <select id="faixaInvestimento" name="faixaInvestimento" className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Selecione
                      </option>
                      {faixasInvestimento.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium">
                    Sua mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={6}
                    className={inputClass}
                    placeholder="Conte um pouco sobre o seu negócio e o que você precisa."
                  />
                  {erros.mensagem && <p className="mt-1 text-xs text-destructive">{erros.mensagem}</p>}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ao enviar, você concorda com a nossa{" "}
                  <Link to="/privacidade" className="underline underline-offset-2 hover:text-foreground">
                    Política de Privacidade
                  </Link>
                  .
                </p>
                <button
                  type="submit"
                  disabled={enviando}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-cream-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {enviando ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-2">
            <div className="surface-cream rounded-2xl p-8">
              <h2 className="font-display text-lg font-semibold">Outros canais</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-olive" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <a href={`mailto:${empresa.email}`} className="text-muted-foreground hover:text-foreground">
                      {empresa.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-olive" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a href={`https://wa.me/${empresa.whatsapp}`} className="text-muted-foreground hover:text-foreground">
                      {empresa.telefone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-olive" />
                  <div>
                    <p className="font-medium">Onde estamos</p>
                    <p className="text-muted-foreground">{empresa.cidade}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-olive" />
                  <div>
                    <p className="font-medium">Horário</p>
                    <p className="text-muted-foreground">{empresa.horario}</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm font-medium">Redes</p>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <a href={empresa.instagramUrl} className="hover:text-foreground">Instagram</a>
                  <a href={empresa.linkedinUrl} className="hover:text-foreground">LinkedIn</a>
                  <a href={empresa.behanceUrl} className="hover:text-foreground">Behance</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
