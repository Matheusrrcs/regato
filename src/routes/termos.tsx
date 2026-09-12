import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Blocos";
import { empresa } from "@/lib/site-data";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Regato" },
      {
        name: "description",
        content:
          "Condições de uso do site da Regato, direitos sobre o conteúdo e regras dos serviços contratados.",
      },
      { property: "og:title", content: "Termos de Uso — Regato" },
      {
        property: "og:description",
        content: "Condições de uso do site e dos serviços da Regato.",
      },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        titulo="Termos de Uso"
        descricao="Última atualização: janeiro de 2026. Documento modelo — revise com apoio jurídico antes de publicar."
      />
      <Section>
        <div className="max-w-3xl space-y-8 text-base text-muted-foreground">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Uso do site
            </h2>
            <p className="mt-3">
              Ao navegar por este site você concorda com estes termos. O
              conteúdo é informativo e pode ser alterado sem aviso prévio.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Propriedade intelectual
            </h2>
            <p className="mt-3">
              Textos, imagens, marcas e projetos apresentados pertencem à{" "}
              {empresa.nome} ou aos respectivos clientes. A reprodução sem
              autorização é proibida.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Propostas e contratos
            </h2>
            <p className="mt-3">
              Valores e prazos exibidos aqui são referências. A contratação só
              se efetiva por proposta assinada, com escopo, cronograma e
              condições de pagamento detalhados.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Entregas e direitos de uso
            </h2>
            <p className="mt-3">
              Os arquivos finais são transferidos ao cliente após a quitação
              integral do projeto. Reservamo-nos o direito de exibir o trabalho
              em nosso portfólio, salvo acordo de confidencialidade.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Contato</h2>
            <p className="mt-3">
              Dúvidas sobre estes termos: {empresa.email}.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
