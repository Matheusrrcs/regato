import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaFinal, PageHeader, Section } from "@/components/site/Blocos";
import { perguntas } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas frequentes — Regato" },
      {
        name: "description",
        content:
          "Preços, prazos, pagamento, textos, arquivos e manutenção: as dúvidas mais comuns sobre nossos projetos.",
      },
      { property: "og:title", content: "Perguntas frequentes — Regato" },
      {
        property: "og:description",
        content:
          "Tire suas dúvidas sobre preços, prazos, pagamento e o que está incluso nos projetos.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: perguntas.map((p) => ({
            "@type": "Question",
            name: p.pergunta,
            acceptedAnswer: { "@type": "Answer", text: p.resposta },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        titulo="Perguntas frequentes"
        descricao="Se a sua dúvida não estiver aqui, é só mandar uma mensagem: respondemos em até 1 dia útil."
      />

      <Section>
        <Accordion type="single" collapsible className="max-w-3xl">
          {perguntas.map((p) => (
            <AccordionItem key={p.pergunta} value={p.pergunta}>
              <AccordionTrigger className="text-left text-base font-medium">
                {p.pergunta}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {p.resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <CtaFinal />
    </>
  );
}
