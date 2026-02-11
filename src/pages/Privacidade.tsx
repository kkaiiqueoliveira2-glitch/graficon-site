import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacidade = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Graficon Revestimento de Cilindros";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="section-industrial bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Política de Privacidade
              </h1>
              <p className="text-muted-foreground text-sm mb-10">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>

              <div className="space-y-8 text-foreground">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A Graficon Revestimento de Cilindros está comprometida com a
                    proteção dos seus dados pessoais em conformidade com a Lei
                    Geral de Proteção de Dados (LGPD - Lei 13.709/2018). Esta
                    política descreve como coletamos, usamos e protegemos suas
                    informações.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    2. Dados que coletamos
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Podemos coletar os seguintes dados quando você preenche nosso
                    formulário ou entra em contato:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Nome da empresa</li>
                    <li>Nome do responsável</li>
                    <li>WhatsApp e outros contatos</li>
                    <li>Serviço desejado</li>
                    <li>Mensagem e demais informações enviadas</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    3. Finalidade do tratamento
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Utilizamos seus dados exclusivamente para: atender
                    solicitações de orçamento, responder dúvidas, manter
                    comunicação comercial e prestar nossos serviços de
                    revestimento e recuperação de cilindros industriais.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    4. Compartilhamento de dados
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Não vendemos, alugamos ou compartilhamos seus dados pessoais
                    com terceiros para fins de marketing. Podemos compartilhar
                    informações apenas quando necessário para cumprir obrigações
                    legais ou com seu consentimento expresso.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    5. Seus direitos (LGPD)
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Você tem direito a:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                    <li>Confirmar a existência de tratamento de dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos ou desatualizados</li>
                    <li>Solicitar a exclusão dos seus dados</li>
                    <li>Revogar o consentimento</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Segurança</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Adotamos medidas técnicas e organizacionais para proteger
                    seus dados contra acesso não autorizado, perda ou destruição.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Contato</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Para exercer seus direitos ou esclarecer dúvidas sobre esta
                    política, entre em contato:
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Graficon Revestimento de Cilindros</strong>
                    <br />
                    E-mail: comercialgraficon@gmail.com
                    <br />
                    Telefone: (11) 99475-7315
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  to="/"
                  className="text-primary font-medium hover:underline"
                >
                  ← Voltar para a página inicial
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
