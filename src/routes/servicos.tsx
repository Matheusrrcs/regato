import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { CtaFinal, PageHeader, Section } from "@/components/site/Blocos";
import { servicos } from "@/lib/site-data";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Regato" },
      {
        name: "description",
        content:
          "Criação de sites, identidade visual e design digital: o que inclui cada serviço, para quem é, entregas e prazos.",
      },
      { property: "og:title", content: "Serviços — Regato" },
      {
        property: "og:description",
        content:
          "Criação de sites, identidade visual e design digital: entregas, prazos e para quem é cada serviço.",
      },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Serviços"
        titulo="Marca, site e design com a mesma coerência"
        descricao="Você pode contratar cada frente separadamente ou juntar tudo em um único projeto. Em qualquer caminho, o processo e o cuidado são os mesmos."
      />

      {servicos.map((s, i) => (
        <Section key={s.slug} cream={i % 2 === 1}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{s.titulo}</h2>
              <p className="mt-5 text-base opacity-80">{s.descricao}</p>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow">Para quem é</dt>
                  <dd className="mt-1 opacity-80">{s.paraQuem}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Prazo</dt>
                  <dd className="mt-1 opacity-80">{s.prazo}</dd>
                </div>
              </dl>
              <Link
                to="/contato"
                className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium ${
                  i % 2 === 1
                    ? "bg-cream-foreground text-cream"
                    : "bg-cream text-cream-foreground"
                }`}
              >
                Pedir orçamento <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border/60 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                O que está incluso
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.entregas.map((e) => (
                  <li key={e} className="flex gap-2 text-sm opacity-85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive" /> {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <CtaFinal />
    </>
  );
}
