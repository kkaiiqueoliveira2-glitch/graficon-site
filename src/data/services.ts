import { Zap, Settings, Layers, Cog, Box, TestTube, type LucideIcon } from "lucide-react";

export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string[];
  bullets: string[];
  faq: ServiceFaq[];
  /**
   * Pergunta que abre pronta nos botões de IA (ver `PerguntarIA.tsx`).
   * É sempre técnica, sobre a decisão que o comprador tem em mãos — nunca sobre
   * a reputação da Graficon, que nenhum modelo conhece hoje.
   */
  promptIA: string;
};

export const services: Service[] = [
  {
    slug: "galvanizacao-e-cromo",
    icon: Zap,
    title: "Galvanização e Cromo",
    description:
      "Todo trabalho de qualidade começa pela base. Processos de galvanização e aplicação de cromo com alto controle técnico, garantindo base confiável e uniforme para o revestimento.",
    image: "/services/svc-galvanizacao.webp",
    seoTitle: "Galvanização e Cromo Duro de Cilindros em SP | Graficon",
    seoDescription:
      "Galvanização e cromo duro em cilindros industriais com alto controle técnico — base uniforme e confiável para o revestimento. Orçamento em São Paulo.",
    longDescription: [
      "A galvanização e a aplicação de cromo são a base de todo revestimento de qualidade. Antes de qualquer acabamento, o cilindro precisa de uma camada metálica uniforme, aderente e dentro das especificações técnicas da aplicação.",
      "Na Graficon, esse processo é feito com controle rigoroso de espessura, dureza e acabamento, garantindo uma superfície confiável que prolonga a vida útil do cilindro e sustenta o desempenho ao longo das tiragens.",
      "Atendemos indústrias e gráficas em São Paulo e região, tanto na aplicação inicial quanto na recuperação de cilindros desgastados que precisam voltar à medida e à dureza originais.",
    ],
    bullets: [
      "Camada uniforme e com boa aderência",
      "Controle de espessura e dureza",
      "Base adequada para diferentes tipos de revestimento",
      "Maior durabilidade e resistência ao desgaste",
    ],
    faq: [
      {
        q: "Qual a diferença entre galvanização e cromo duro?",
        a: "A galvanização deposita uma camada metálica de proteção e base no cilindro, enquanto o cromo duro aplica uma camada de alta dureza voltada à resistência ao desgaste e à recuperação de medida. Na prática, os dois processos se complementam para entregar uma superfície durável e dentro da especificação.",
      },
      {
        q: "O cromo duro serve para recuperar a medida de um cilindro desgastado?",
        a: "Sim. O cromo duro é muito usado para devolver a medida e o acabamento de cilindros que sofreram desgaste em operação, restaurando as condições técnicas de uso por um custo menor do que comprar uma peça nova.",
      },
      {
        q: "Vocês atendem cilindros para flexografia e rotogravura?",
        a: "Sim. Trabalhamos com cilindros para flexografia, rotogravura, embalagens, papel e celulose e outras aplicações industriais, ajustando o processo de galvanização e cromo à exigência de cada uso.",
      },
    ],
    promptIA:
      "Vale mais a pena recuperar um cilindro industrial desgastado com cromo duro ou comprar um cilindro novo? Quais critérios técnicos devo usar pra decidir?",
  },
  {
    slug: "preparacao-tecnica-e-tratamentos",
    icon: Settings,
    title: "Preparação Técnica e Tratamentos",
    description:
      "Análise de materiais, ajustes técnicos e definição do revestimento mais adequado para cada aplicação, com resultados consistentes.",
    image: "/services/svc-preparacao.webp",
    seoTitle: "Preparação Técnica e Tratamentos de Cilindros | Graficon SP",
    seoDescription:
      "Análise de materiais, ajustes técnicos e definição do revestimento ideal para cada cilindro, com resultados consistentes e previsíveis. São Paulo.",
    longDescription: [
      "Cada cilindro tem uma aplicação, um material e uma exigência diferente. A etapa de preparação técnica analisa essas variáveis para definir o tratamento e o revestimento mais adequados antes da execução.",
      "Esse diagnóstico evita retrabalho, garante repetibilidade e assegura que o resultado final atenda às condições reais de uso do cliente.",
      "É a fase em que a experiência de +40 anos da Graficon mais pesa: identificar a causa do desgaste e indicar o caminho técnico certo antes de qualquer aplicação.",
    ],
    bullets: [
      "Análise técnica de materiais e aplicação",
      "Definição do tratamento ideal",
      "Ajustes e correções dimensionais",
      "Resultados consistentes e previsíveis",
    ],
    faq: [
      {
        q: "Por que a preparação técnica é importante antes do revestimento?",
        a: "Porque ela define o tratamento e o revestimento certos para a aplicação real do cilindro. Pular essa etapa é a principal causa de retrabalho, descolamento de camada e desgaste precoce. Uma boa preparação garante repetibilidade e durabilidade.",
      },
      {
        q: "Vocês avaliam o cilindro antes de fechar o orçamento?",
        a: "Sim. Analisamos material, medidas, tipo de aplicação e estado da peça para indicar o tratamento mais adequado e dar um orçamento técnico, não um valor genérico.",
      },
      {
        q: "Dá para corrigir medidas e desvios dimensionais nessa etapa?",
        a: "Sim. A preparação técnica inclui ajustes e correções dimensionais para que o cilindro volte à especificação e encaixe corretamente no equipamento do cliente.",
      },
    ],
    promptIA:
      "Como identificar a causa do desgaste de um cilindro de impressão antes de mandar revestir? O que acontece se a causa não for corrigida?",
  },
  {
    slug: "processos-de-revestimento",
    icon: Layers,
    title: "Processos de Revestimento",
    description:
      "Revestimento realizado com controle rigoroso e tecnologia adequada para assegurar precisão, uniformidade e repetibilidade em cada entrega.",
    image: "/services/svc-revestimento.webp",
    seoTitle: "Processos de Revestimento de Cilindros | Graficon SP",
    seoDescription:
      "Revestimento de cilindros com controle rigoroso e tecnologia adequada — precisão, uniformidade e repetibilidade em cada entrega. São Paulo.",
    longDescription: [
      "O revestimento é o coração do nosso trabalho. Aplicamos a camada técnica sobre o cilindro com controle rigoroso de processo, garantindo precisão dimensional, uniformidade de superfície e repetibilidade entre as peças.",
      "Trabalhamos com diferentes tipos de revestimento conforme o processo de impressão ou a aplicação industrial, sempre com foco em desempenho e durabilidade.",
      "Cada revestimento é definido a partir da aplicação real: o que funciona para flexografia pode não ser o ideal para rotogravura ou para uma peça de uso industrial pesado.",
    ],
    bullets: [
      "Precisão e uniformidade de superfície",
      "Repetibilidade entre cilindros",
      "Revestimento adequado a cada processo",
      "Alta resistência para longas tiragens",
    ],
    faq: [
      {
        q: "Quais tipos de revestimento de cilindro a Graficon faz?",
        a: "Trabalhamos com diferentes revestimentos técnicos conforme o processo de impressão (flexografia, rotogravura) ou a aplicação industrial. A escolha é definida na preparação técnica, a partir do material, da exigência de dureza e das condições de uso.",
      },
      {
        q: "Quanto tempo dura um cilindro revestido?",
        a: "Depende do tipo de revestimento, da tiragem e das condições de operação. Um revestimento bem executado e com a camada adequada prolonga significativamente a vida útil e mantém a qualidade de impressão por mais tempo.",
      },
      {
        q: "O revestimento garante repetibilidade entre vários cilindros?",
        a: "Sim. Trabalhamos com controle de processo justamente para assegurar uniformidade de superfície e repetibilidade entre peças, o que é essencial para quem precisa de padrão constante em produção.",
      },
    ],
    promptIA:
      "Qual tipo de revestimento de cilindro é indicado para flexografia e qual para rotogravura? O que muda entre os dois processos?",
  },
  {
    slug: "usinagem-e-fabricacao",
    icon: Cog,
    title: "Usinagem e Fabricação",
    description:
      "Capacidade técnica para usinagem e fabricação de cilindros industriais, atendendo diferentes equipamentos, medidas e aplicações.",
    image: "/services/svc-usinagem.webp",
    seoTitle: "Usinagem e Fabricação de Cilindros Industriais | Graficon SP",
    seoDescription:
      "Estrutura e capacidade técnica para usinagem e fabricação de cilindros industriais, conforme equipamentos, medidas e aplicações. São Paulo.",
    longDescription: [
      "Além do revestimento, contamos com estrutura para usinagem e fabricação de cilindros industriais, atendendo diferentes equipamentos, medidas e especificações.",
      "Cada peça é trabalhada com balanceamento adequado e conferência dimensional, assegurando encaixe perfeito e desempenho na máquina do cliente.",
      "Isso permite entregar uma solução completa: do corpo do cilindro ao acabamento final revestido, sem o cliente precisar coordenar vários fornecedores.",
    ],
    bullets: [
      "Usinagem conforme especificação",
      "Fabricação para diferentes equipamentos",
      "Balanceamento e conferência dimensional",
      "Acabamento de precisão",
    ],
    faq: [
      {
        q: "A Graficon fabrica cilindros novos ou só reveste?",
        a: "Fazemos os dois. Além do revestimento e da recuperação, temos estrutura para usinagem e fabricação de cilindros industriais conforme o equipamento, a medida e a aplicação do cliente.",
      },
      {
        q: "Vocês fazem cilindros sob medida para a minha máquina?",
        a: "Sim. Trabalhamos a partir da especificação do seu equipamento, com conferência dimensional e balanceamento, para garantir encaixe e desempenho corretos na máquina.",
      },
      {
        q: "É possível usinar e revestir o mesmo cilindro com vocês?",
        a: "Sim. Entregamos a solução completa — usinagem, fabricação e revestimento — em um único fornecedor, o que reduz prazo e evita problemas de compatibilidade entre etapas.",
      },
    ],
    promptIA:
      "Quando compensa mandar fabricar um cilindro industrial sob medida em vez de adaptar um de catálogo? Que riscos a adaptação traz?",
  },
  {
    slug: "cilindros-especiais",
    icon: Box,
    title: "Cilindros Especiais",
    description:
      "Processos diferenciados, materiais especiais ou condições particulares: soluções adequadas para cada necessidade técnica.",
    image: "/services/svc-especiais.webp",
    seoTitle: "Cilindros Especiais sob Medida | Graficon SP",
    seoDescription:
      "Soluções para demandas específicas: processos diferenciados, materiais especiais ou condições particulares de aplicação. São Paulo.",
    longDescription: [
      "Algumas demandas fogem do padrão — seja por material, dimensão, processo ou condição de uso. Para esses casos, desenvolvemos soluções sob medida.",
      "Avaliamos a necessidade técnica e indicamos a melhor combinação de processo e material, entregando um cilindro adequado à sua aplicação específica.",
      "É aqui que os +40 anos de experiência fazem diferença: quanto mais incomum o desafio, mais conta o repertório técnico de quem já resolveu casos parecidos.",
    ],
    bullets: [
      "Soluções sob medida",
      "Materiais e processos especiais",
      "Atendimento a condições particulares",
      "Avaliação técnica dedicada",
    ],
    faq: [
      {
        q: "O que é considerado um cilindro especial?",
        a: "É qualquer cilindro que foge do padrão por material, dimensão, processo ou condição de uso — por exemplo, peças muito grandes, aplicações de alta exigência ou combinações específicas de revestimento. Para esses casos desenvolvemos solução sob medida.",
      },
      {
        q: "Vocês atendem demandas fora do padrão da indústria gráfica?",
        a: "Sim. Além da indústria gráfica, atendemos aplicações industriais diversas que exigem revestimento técnico de cilindros e peças, sempre a partir de uma avaliação técnica dedicada.",
      },
      {
        q: "Como começo um projeto de cilindro especial?",
        a: "Descreva a peça, o material e a condição de uso pelo formulário ou pelo WhatsApp (11) 91529-1313. A partir disso fazemos a avaliação técnica e indicamos a melhor combinação de processo e material.",
      },
    ],
    promptIA:
      "Que cuidados extras um cilindro industrial fora do padrão exige na escolha de material e de revestimento? O que costuma dar errado nesses casos?",
  },
  {
    slug: "prova-e-analise",
    icon: TestTube,
    title: "Prova e Análise",
    description:
      "Provas e análises técnicas para verificação da qualidade dos cilindros revestidos: acabamento, uniformidade e características técnicas.",
    image: "/services/svc-prova.webp",
    seoTitle: "Prova e Análise de Cilindros Revestidos | Graficon SP",
    seoDescription:
      "Provas e análises técnicas para verificação da qualidade dos cilindros revestidos: acabamento, uniformidade e características técnicas. São Paulo.",
    longDescription: [
      "Antes da entrega, cada cilindro passa por provas e análises técnicas que verificam acabamento, uniformidade e as características definidas no projeto.",
      "Esse controle de qualidade final garante que a peça saia aprovada e pronta para operar com segurança e desempenho.",
      "É o que sustenta o nosso 100% de controle de qualidade: nenhum cilindro é entregue sem confirmar que está dentro da especificação combinada.",
    ],
    bullets: [
      "Verificação de acabamento e uniformidade",
      "Conferência das especificações técnicas",
      "Controle de qualidade rigoroso",
      "Aprovação com segurança",
    ],
    faq: [
      {
        q: "Como a Graficon garante a qualidade do cilindro revestido?",
        a: "Cada cilindro passa por provas e análises técnicas antes da entrega, verificando acabamento, uniformidade e as características definidas no projeto. Nenhuma peça é liberada sem confirmar que está dentro da especificação combinada.",
      },
      {
        q: "O que é verificado na etapa de prova e análise?",
        a: "Verificamos acabamento de superfície, uniformidade da camada, medidas e as características técnicas acordadas para a aplicação. É o controle de qualidade final antes da entrega.",
      },
      {
        q: "Recebo algum retorno técnico sobre o cilindro entregue?",
        a: "Sim. A aprovação na prova e análise confirma que a peça está apta a operar com segurança e desempenho, e ficamos à disposição para alinhar os resultados conforme a necessidade do cliente.",
      },
    ],
    promptIA:
      "Como verificar se um cilindro revestido saiu dentro da especificação de espessura e dureza? Que medições devo exigir do fornecedor?",
  },
];

export const getServiceBySlug = (slug?: string) =>
  services.find((s) => s.slug === slug);
