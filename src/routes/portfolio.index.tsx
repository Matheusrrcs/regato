import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaFinal, PageHeader, Section } from "@/components/site/Blocos";
import { categoriasProjeto, projetos } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfólio — Regato" },
      {
        name: "description",
        content:
          "Projetos de identidade visual, criação de sites e design digital entregues pelo estúdio Regato.",
      },
      { property: "og:title", content: "Portfólio — Regato" },
      {
        property: "og:description",
        content:
          "Marcas, sites e sistemas visuais: veja o desafio, a solução e o resultado de cada projeto.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filtro, setFiltro] = useState<string>("Todos");
  const lista =
    filtro === "Todos"
      ? projetos
      : projetos.filter((p) => p.categoria === filtro);

  return (
    <>
      <PageHeader
        eyebrow="Portfólio"
        titulo="Projetos que ganharam movimento"
        descricao="Cada projeto começa por uma pergunta de negócio. Veja o desafio, o caminho e o resultado."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {categoriasProjeto.map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filtro === c
                  ? "border-transparent bg-cream text-cream-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <Link
              key={p.slug}
              to="/portfolio/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={p.imagem}
                alt={`Projeto ${p.nome}`}
                loading="lazy"
                className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{p.categoria}</p>
                  <span className="text-xs text-muted-foreground">{p.ano}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold">{p.nome}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.resumo}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
