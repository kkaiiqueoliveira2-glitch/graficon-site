import { Zap, Settings, Layers, Cog, Box, TestTube, Wrench, type LucideIcon } from "lucide-react";

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
  /**
   * Pré-preenche o campo "qual peça" do formulário no rodapé da página.
   * Quem chega numa página de serviço já disse o que quer ao clicar nela:
   * repetir a pergunta custa um campo e não acrescenta informação.
   */
  pecaPadrao?: string;
  /** Exemplo do campo livre, ajustado ao serviço da página. */
  exemploMensagem?: string;
};

export const services: Service[] = [
  {
    slug: "galvanizacao-e-cromo",
    pecaPadrao: "Cilindro para cromo duro",
    exemploMensagem:
      "Ex: repor camada de cromo duro, voltar à medida original...",
    icon: Zap,
    title: "Cromo Duro e Galvanização",
    description:
      "Reposição de camada de cromo duro em cilindros e hastes para devolver a medida original e a resistência ao desgaste, com controle de espessura e dureza.",
    image: "/services/svc-galvanizacao.webp",
    seoTitle: "Cromo Duro em Cilindros e Hastes em SP | Graficon",
    seoDescription:
      "Reposição de camada de cromo duro para recuperar a medida original de cilindros e hastes industriais em São Paulo. Mande a medida e a foto e receba um orçamento técnico.",
    longDescription: [
      "Quando um cilindro perde medida por desgaste, na maioria dos casos ele não precisa ser substituído. A reposição de camada de cromo duro devolve a peça à medida original e à dureza de projeto, por um custo bem menor do que comprar um cilindro novo.",
      "O processo é feito com controle rigoroso de espessura, dureza e acabamento. A camada de cromo tem alta resistência ao desgaste, o que prolonga a vida útil da peça e sustenta o desempenho ao longo das tiragens. A galvanização entra quando a aplicação pede uma camada metálica de base antes do acabamento final.",
      "Sobre escopo, para não fazer ninguém perder tempo: trabalhamos apenas com cilindros e hastes de máquinas industriais e gráficas. Não fazemos cromagem de peça avulsa, decorativa nem automotiva. Se a sua peça é de máquina, mande a medida e a foto que avaliamos se dá para recuperar.",
    ],
    bullets: [
      "Devolve a medida original da peça",
      "Alta resistência ao desgaste",
      "Controle de espessura, dureza e acabamento",
      "Custa menos que um cilindro novo",
    ],
    faq: [
      {
        q: "O cromo duro serve para recuperar a medida de um cilindro desgastado?",
        a: "Sim, e é o uso mais comum. O cromo duro devolve medida e acabamento a cilindros e hastes que sofreram desgaste em operação, restaurando as condições técnicas de uso por um custo menor do que comprar uma peça nova.",
      },
      {
        q: "Vocês fazem cromo em peça avulsa, aro, roda ou peça automotiva?",
        a: "Não. A Graficon trabalha só com cilindros e hastes de máquinas industriais e gráficas. Cromagem decorativa, automotiva ou de peça avulsa não é o nosso serviço, e preferimos dizer isso antes de você perder tempo pedindo orçamento.",
      },
      {
        q: "Qual a diferença entre galvanização e cromo duro?",
        a: "A galvanização deposita uma camada metálica de proteção e base no cilindro, enquanto o cromo duro aplica uma camada de alta dureza voltada à resistência ao desgaste e à recuperação de medida. Na prática, os dois processos se complementam para entregar uma superfície durável e dentro da especificação.",
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
    pecaPadrao: "Eixo ou cilindro para metalização",
    exemploMensagem:
      "Ex: metalização de eixo, niquelagem, carboneto de cromo...",
    icon: Settings,
    title: "Metalização, Niquelagem e Tratamentos",
    description:
      "Metalização de eixo, niquelagem e carboneto de cromo em cilindros e hastes, com a análise técnica que define o tratamento certo para cada aplicação.",
    image: "/services/svc-preparacao.webp",
    seoTitle: "Metalização de Eixo, Niquelagem e Carboneto de Cromo | Graficon",
    seoDescription:
      "Metalização de eixo, niquelagem e carboneto de cromo em cilindros e hastes industriais em São Paulo. Mande a medida e a foto e receba um orçamento técnico.",
    longDescription: [
      "Além do cromo duro, a Graficon aplica metalização de eixo, niquelagem e carboneto de cromo em cilindros e hastes de máquinas industriais e gráficas. São tratamentos de superfície usados para devolver medida, aumentar a resistência ao desgaste e prolongar a vida útil da peça.",
      "Cada cilindro tem uma aplicação, um material e uma exigência diferente. Antes de executar, a etapa de preparação técnica analisa essas variáveis para definir qual tratamento faz sentido: nem toda peça precisa do mesmo processo, e indicar o caminho errado é a principal causa de retrabalho e desgaste precoce.",
      "É a fase em que a experiência de +40 anos mais pesa: identificar a causa do desgaste e indicar o caminho técnico certo antes de qualquer aplicação. Atendemos indústrias e gráficas em São Paulo e região.",
    ],
    bullets: [
      "Metalização de eixo e recuperação de medida",
      "Niquelagem e carboneto de cromo",
      "Análise técnica de materiais e aplicação",
      "Ajustes e correções dimensionais",
    ],
    faq: [
      {
        q: "Vocês fazem metalização de eixo e niquelagem?",
        a: "Sim. Trabalhamos com metalização de eixo, niquelagem e carboneto de cromo, sempre em cilindros e hastes de máquinas industriais e gráficas. Não atendemos peça avulsa nem cromagem decorativa ou automotiva.",
      },
      {
        q: "Como sei qual tratamento a minha peça precisa?",
        a: "Essa é justamente a etapa de preparação técnica. Analisamos material, medidas, tipo de aplicação e estado da peça para indicar o tratamento adequado e dar um orçamento técnico, não um valor genérico. Mande a medida e a foto no WhatsApp que avaliamos.",
      },
      {
        q: "Por que a preparação técnica é importante antes do revestimento?",
        a: "Porque ela define o tratamento e o revestimento certos para a aplicação real do cilindro. Pular essa etapa é a principal causa de retrabalho, descolamento de camada e desgaste precoce. Uma boa preparação garante repetibilidade e durabilidade.",
      },
      {
        q: "Dá para corrigir medidas e desvios dimensionais nessa etapa?",
        a: "Sim. A preparação técnica inclui ajustes e correções dimensionais para que o cilindro volte à especificação e encaixe corretamente no equipamento do cliente.",
      },
    ],
    promptIA:
      "Quando usar metalização de eixo em vez de cromo duro para recuperar a medida de um cilindro industrial? Quais critérios técnicos decidem?",
  },
  {
    slug: "processos-de-revestimento",
    pecaPadrao: "Cilindro para revestimento",
    exemploMensagem:
      "Ex: reencape de rolo de borracha, revestimento para flexografia...",
    icon: Layers,
    title: "Revestimento e Reencape de Borracha",
    description:
      "Reencape de rolos e cilindros de borracha para flexografia, rotogravura, papel e celulose, com precisão dimensional e uniformidade de superfície.",
    image: "/services/svc-revestimento.webp",
    seoTitle: "Revestimento de Cilindros e Reencape de Rolo de Borracha | SP",
    seoDescription:
      "Reencape de rolo de borracha e revestimento de cilindros para flexografia, rotogravura, papel e celulose. Precisão dimensional e uniformidade em São Paulo.",
    longDescription: [
      "O revestimento é o coração do nosso trabalho. Aplicamos a camada técnica sobre o cilindro com controle rigoroso de processo, garantindo precisão dimensional, uniformidade de superfície e repetibilidade entre as peças.",
      "Reencapamos rolos e cilindros de borracha para flexografia, rotogravura, embalagens, papel e celulose. Cada aplicação pede uma dureza e um acabamento diferentes: o que funciona para flexografia pode não ser o ideal para rotogravura ou para uma peça de uso industrial pesado.",
      "Cilindro emborrachado que perdeu diâmetro, endureceu ou passou a marcar a superfície costuma voltar à condição de uso com reencape, sem precisar de peça nova. Mande a medida e a foto que avaliamos.",
    ],
    bullets: [
      "Reencape de rolos e cilindros de borracha",
      "Dureza ajustada à aplicação",
      "Precisão dimensional e uniformidade",
      "Alta resistência para longas tiragens",
    ],
    faq: [
      {
        q: "Vocês fazem reencape de rolo de borracha?",
        a: "Sim. Reencapamos rolos e cilindros de borracha para flexografia, rotogravura, embalagens, papel e celulose, ajustando a dureza e o acabamento à aplicação real da peça.",
      },
      {
        q: "Meu cilindro emborrachado está marcando o material. Dá para recuperar?",
        a: "Na maioria dos casos, sim. Marcação, perda de diâmetro e endurecimento da borracha são sinais de desgaste normal do revestimento, e o reencape devolve a peça à condição de uso. Mande a medida e uma foto que avaliamos antes de orçar.",
      },
      {
        q: "Como vocês definem a dureza da borracha?",
        a: "Pela aplicação real do cilindro: tipo de máquina, material processado e pressão de trabalho. É por isso que pedimos a medida e a foto antes de fechar o orçamento, em vez de dar um valor genérico por telefone.",
      },
    ],
    promptIA:
      "Quando um rolo de borracha de máquina gráfica precisa de reencape em vez de limpeza ou retífica? Que sinais indicam fim de vida do revestimento?",
  },
  {
    slug: "usinagem-e-fabricacao",
    pecaPadrao: "Peça para usinagem",
    exemploMensagem:
      "Ex: retífica, ajuste de medida, fabricação sob desenho...",
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
    pecaPadrao: "Cilindro especial",
    exemploMensagem:
      "Ex: cilindro sob desenho, aplicação fora do padrão...",
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
    pecaPadrao: "Cilindro para analise",
    exemploMensagem:
      "Ex: verificar dureza, espessura de camada, causa do desgaste...",
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
  {
    slug: "cilindro-hidraulico-e-haste",
    pecaPadrao: "Haste ou pistão de cilindro hidráulico",
    exemploMensagem:
      "Ex: haste riscada, pistão fora de medida, cilindro vazando...",
    icon: Wrench,
    // TODO: trocar por foto real da operação hidráulica quando houver.
    image: "/services/svc-usinagem.webp",
    title: "Cilindro Hidráulico e Haste",
    description:
      "Recuperação de haste e pistão de cilindro hidráulico: reposição de camada de cromo, correção de medida e acabamento para a peça voltar a operar.",
    seoTitle: "Recuperação de Cilindro Hidráulico e Haste em SP | Graficon",
    seoDescription:
      "Conserto de pistão hidráulico e recuperação de haste de cilindro: reposição de cromo, correção de medida e acabamento. Orçamento técnico em São Paulo.",
    longDescription: [
      "Haste de cilindro hidráulico riscada, ovalizada ou fora de medida costuma ser recuperável. Repomos a camada de cromo, corrigimos a medida e devolvemos o acabamento necessário para a vedação trabalhar sem vazar, o que quase sempre sai mais barato e mais rápido do que comprar uma haste nova.",
      "O mesmo vale para pistões e camisas que perderam especificação por desgaste de operação. O diagnóstico começa pela medida e pelo estado da superfície: nem toda peça compensa recuperar, e dizemos isso antes de orçar.",
      "Atendemos indústrias, oficinas e frotas em São Paulo e região. Mande a medida e a foto da peça pelo WhatsApp e avaliamos se dá para recuperar.",
    ],
    bullets: [
      "Reposição de cromo em haste e pistão",
      "Correção de medida e ovalização",
      "Acabamento adequado à vedação",
      "Diagnóstico antes do orçamento",
    ],
    faq: [
      {
        q: "Vocês consertam pistão e haste de cilindro hidráulico?",
        a: "Sim. Trabalhamos com recuperação de haste e pistão: reposição de camada de cromo, correção de medida e acabamento. O que não fazemos é peça avulsa de uso decorativo ou automotivo, como aro e para-choque.",
      },
      {
        q: "Minha haste está riscada e o cilindro vaza. Isso tem conserto?",
        a: "Normalmente sim. Risco na haste danifica a vedação e é uma das causas mais comuns de vazamento. Repor a camada de cromo e refazer o acabamento devolve a superfície que o retentor precisa para trabalhar.",
      },
      {
        q: "Compensa recuperar ou é melhor comprar uma haste nova?",
        a: "Depende do estado da peça e da profundidade do desgaste. É exatamente isso que avaliamos com a medida e a foto antes de orçar. Quando não compensar, falamos.",
      },
    ],
    promptIA:
      "Quando compensa recuperar a haste de um cilindro hidráulico com cromo duro em vez de trocar a peça? Que profundidade de desgaste inviabiliza o reparo?",
  },
];

export const getServiceBySlug = (slug?: string) =>
  services.find((s) => s.slug === slug);
