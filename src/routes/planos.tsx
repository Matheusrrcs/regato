import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { CtaFinal, PageHeader, Section } from "@/components/site/Blocos";
import { planos } from "@/lib/site-data";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e preços — Regato" },
      {
        name: "description",
        content:
          "Três pacotes de criação de sites e identidade visual, com o que entra em cada um, mais projetos sob medida.",
      },
      { property: "og:title", content: "Planos e preços — Regato" },
      {
        property: "og:description",
        content:
          "Pacotes Essencial, Movimento e Presença: escopo, valores e para quem cada um serve.",
      },
    ],
  }),
  component: PlanosPage,
});

function PlanosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Planos e preços"
        titulo="Valores claros desde o primeiro contato"
        descricao="Escolha um pacote fechado ou peça um orçamento sob medida. Em todos os casos, o escopo é combinado por escrito antes de começar."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {planos.map((p) => (
            <div
              key={p.nome}
              className={`flex flex-col rounded-2xl border p-8 ${
                p.destaque
                  ? "surface-cream border-transparent"
                  : "border-border"
              }`}
            >
              {p.destaque && (
                <span className="mb-4 w-fit rounded-full bg-cream-foreground px-3 py-1 text-xs font-medium text-cream">
                  Mais procurado
                </span>
              )}
              <h2 className="text-xl font-semibold">{p.nome}</h2>
              <p className="mt-2 text-sm opacity-70">{p.resumo}</p>
              <p className="mt-6 font-display text-4xl font-bold">{p.preco}</p>
              <p className="text-sm opacity-60">{p.periodo}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {p.itens.map((i) => (
                  <li key={i} className="flex gap-2 text-sm opacity-85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs opacity-60">Ideal para: {p.ideal}</p>
              <Link
                to="/contato"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium ${
                  p.destaque
                    ? "bg-cream-foreground text-cream"
                    : "bg-cream text-cream-foreground"
                }`}
              >
                Quero este plano <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border p-8">
          <h2 className="text-xl font-semibold">Projeto sob medida</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Operações maiores, plataformas com áreas logadas, e-commerce ou
            rebrandings completos são orçados caso a caso, a partir de R$ 25.000.
            Conte o contexto e montamos uma proposta detalhada.
          </p>
          <Link
            to="/contato"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-olive"
          >
            Falar sobre um projeto sob medida <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
