import { createFileRoute } from "@tanstack/react-router";
import { CtaFinal, PageHeader, Section } from "@/components/site/Blocos";
import { etapasProcesso } from "@/lib/site-data";

export const Route = createFileRoute("/processo")({
  head: () => ({
    meta: [
      { title: "Processo — Regato" },
      {
        name: "description",
        content:
          "Como trabalhamos: da conversa inicial à entrega, com prazos, entregas parciais e acompanhamento.",
      },
      { property: "og:title", content: "Processo — Regato" },
      {
        property: "og:description",
        content:
          "As seis etapas do nosso trabalho, do briefing à publicação e acompanhamento.",
      },
    ],
  }),
  component: ProcessoPage,
});

function ProcessoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Processo"
        titulo="Do briefing à entrega, sem surpresa"
        descricao="Cada etapa tem objetivo, duração e um combinado claro. Você acompanha tudo de perto."
      />

      <Section>
        <ol className="relative space-y-12 border-l border-border pl-8">
          {etapasProcesso.map((e) => (
            <li key={e.numero} className="relative">
              <span className="absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border border-olive bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="eyebrow">{e.numero}</p>
                <h2 className="text-2xl font-semibold">{e.titulo}</h2>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {e.duracao}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                {e.texto}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaFinal />
    </>
  );
}
