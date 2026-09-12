import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Blocos";
import { empresa } from "@/lib/site-data";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Regato" },
      {
        name: "description",
        content:
          "Como a Regato coleta, usa e protege os dados enviados pelo formulário de contato do site.",
      },
      { property: "og:title", content: "Política de Privacidade — Regato" },
      {
        property: "og:description",
        content: "Tratamento de dados pessoais no site da Regato.",
      },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        titulo="Política de Privacidade"
        descricao="Última atualização: janeiro de 2026. Documento modelo — revise com apoio jurídico antes de publicar."
      />
      <Section>
        <div className="max-w-3xl space-y-8 text-base text-muted-foreground">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Dados que coletamos
            </h2>
            <p className="mt-3">
              Coletamos apenas os dados que você informa no formulário de
              contato: nome, e-mail, telefone, empresa, tipo de projeto, faixa de
              investimento e a mensagem enviada.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Como usamos
            </h2>
            <p className="mt-3">
              Usamos esses dados exclusivamente para responder à sua solicitação
              e elaborar propostas comerciais. Não vendemos nem compartilhamos
              seus dados com terceiros para fins de marketing.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Armazenamento e segurança
            </h2>
            <p className="mt-3">
              As mensagens ficam guardadas em banco de dados com acesso restrito
              à equipe do estúdio. Mantemos os registros pelo tempo necessário
              para o atendimento e obrigações legais.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Seus direitos (LGPD)
            </h2>
            <p className="mt-3">
              Você pode solicitar acesso, correção ou exclusão dos seus dados a
              qualquer momento pelo e-mail {empresa.email}. Responderemos em até
              15 dias.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
            <p className="mt-3">
              Este site não utiliza cookies de publicidade. Podemos usar
              medições agregadas de acesso, sem identificar você pessoalmente.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
