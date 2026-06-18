import { Zap, Settings, Layers, Cog, Box, TestTube, type LucideIcon } from "lucide-react";

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
};

export const services: Service[] = [
  {
    slug: "galvanizacao-e-cromo",
    icon: Zap,
    title: "Galvanização e Cromo",
    description:
      "Todo trabalho de qualidade começa pela base. Processos de galvanização e aplicação de cromo com alto controle técnico, garantindo base confiável e uniforme para o revestimento.",
    image: "/services/svc-galvanizacao.webp",
    seoTitle: "Galvanização e Cromo de Cilindros | Graficon",
    seoDescription:
      "Galvanização e aplicação de cromo em cilindros industriais com alto controle técnico — base uniforme e confiável para o revestimento.",
    longDescription: [
      "A galvanização e a aplicação de cromo são a base de todo revestimento de qualidade. Antes de qualquer acabamento, o cilindro precisa de uma camada metálica uniforme, aderente e dentro das especificações técnicas da aplicação.",
      "Na Graficon, esse processo é feito com controle rigoroso de espessura, dureza e acabamento, garantindo uma superfície confiável que prolonga a vida útil do cilindro e sustenta o desempenho ao longo das tiragens.",
    ],
    bullets: [
      "Camada uniforme e com boa aderência",
      "Controle de espessura e dureza",
      "Base adequada para diferentes tipos de revestimento",
      "Maior durabilidade e resistência ao desgaste",
    ],
  },
  {
    slug: "preparacao-tecnica-e-tratamentos",
    icon: Settings,
    title: "Preparação Técnica e Tratamentos",
    description:
      "Análise de materiais, ajustes técnicos e definição do revestimento mais adequado para cada aplicação, com resultados consistentes.",
    image: "/services/svc-preparacao.webp",
    seoTitle: "Preparação Técnica e Tratamentos de Cilindros | Graficon",
    seoDescription:
      "Análise de materiais, ajustes técnicos e definição do revestimento ideal para cada aplicação, com resultados consistentes e previsíveis.",
    longDescription: [
      "Cada cilindro tem uma aplicação, um material e uma exigência diferente. A etapa de preparação técnica analisa essas variáveis para definir o tratamento e o revestimento mais adequados antes da execução.",
      "Esse diagnóstico evita retrabalho, garante repetibilidade e assegura que o resultado final atenda às condições reais de uso do cliente.",
    ],
    bullets: [
      "Análise técnica de materiais e aplicação",
      "Definição do tratamento ideal",
      "Ajustes e correções dimensionais",
      "Resultados consistentes e previsíveis",
    ],
  },
  {
    slug: "processos-de-revestimento",
    icon: Layers,
    title: "Processos de Revestimento",
    description:
      "Revestimento realizado com controle rigoroso e tecnologia adequada para assegurar precisão, uniformidade e repetibilidade em cada entrega.",
    image: "/services/svc-revestimento.webp",
    seoTitle: "Processos de Revestimento de Cilindros | Graficon",
    seoDescription:
      "Revestimento de cilindros com controle rigoroso e tecnologia adequada — precisão, uniformidade e repetibilidade em cada entrega.",
    longDescription: [
      "O revestimento é o coração do nosso trabalho. Aplicamos a camada técnica sobre o cilindro com controle rigoroso de processo, garantindo precisão dimensional, uniformidade de superfície e repetibilidade entre as peças.",
      "Trabalhamos com diferentes tipos de revestimento conforme o processo de impressão ou a aplicação industrial, sempre com foco em desempenho e durabilidade.",
    ],
    bullets: [
      "Precisão e uniformidade de superfície",
      "Repetibilidade entre cilindros",
      "Revestimento adequado a cada processo",
      "Alta resistência para longas tiragens",
    ],
  },
  {
    slug: "usinagem-e-fabricacao",
    icon: Cog,
    title: "Usinagem e Fabricação",
    description:
      "Capacidade técnica para usinagem e fabricação de cilindros industriais, atendendo diferentes equipamentos, medidas e aplicações.",
    image: "/services/svc-usinagem.webp",
    seoTitle: "Usinagem e Fabricação de Cilindros | Graficon",
    seoDescription:
      "Estrutura e capacidade técnica para usinagem e fabricação de cilindros industriais, conforme equipamentos, medidas e aplicações.",
    longDescription: [
      "Além do revestimento, contamos com estrutura para usinagem e fabricação de cilindros industriais, atendendo diferentes equipamentos, medidas e especificações.",
      "Cada peça é trabalhada com balanceamento adequado e conferência dimensional, assegurando encaixe perfeito e desempenho na máquina do cliente.",
    ],
    bullets: [
      "Usinagem conforme especificação",
      "Fabricação para diferentes equipamentos",
      "Balanceamento e conferência dimensional",
      "Acabamento de precisão",
    ],
  },
  {
    slug: "cilindros-especiais",
    icon: Box,
    title: "Cilindros Especiais",
    description:
      "Processos diferenciados, materiais especiais ou condições particulares: soluções adequadas para cada necessidade técnica.",
    image: "/services/svc-especiais.webp",
    seoTitle: "Cilindros Especiais sob Medida | Graficon",
    seoDescription:
      "Soluções para demandas específicas: processos diferenciados, materiais especiais ou condições particulares de aplicação.",
    longDescription: [
      "Algumas demandas fogem do padrão — seja por material, dimensão, processo ou condição de uso. Para esses casos, desenvolvemos soluções sob medida.",
      "Avaliamos a necessidade técnica e indicamos a melhor combinação de processo e material, entregando um cilindro adequado à sua aplicação específica.",
    ],
    bullets: [
      "Soluções sob medida",
      "Materiais e processos especiais",
      "Atendimento a condições particulares",
      "Avaliação técnica dedicada",
    ],
  },
  {
    slug: "prova-e-analise",
    icon: TestTube,
    title: "Prova e Análise",
    description:
      "Provas e análises técnicas para verificação da qualidade dos cilindros revestidos: acabamento, uniformidade e características técnicas.",
    image: "/services/svc-prova.webp",
    seoTitle: "Prova e Análise de Cilindros | Graficon",
    seoDescription:
      "Provas e análises técnicas para verificação da qualidade dos cilindros revestidos: acabamento, uniformidade e características técnicas.",
    longDescription: [
      "Antes da entrega, cada cilindro passa por provas e análises técnicas que verificam acabamento, uniformidade e as características definidas no projeto.",
      "Esse controle de qualidade final garante que a peça saia aprovada e pronta para operar com segurança e desempenho.",
    ],
    bullets: [
      "Verificação de acabamento e uniformidade",
      "Conferência das especificações técnicas",
      "Controle de qualidade rigoroso",
      "Aprovação com segurança",
    ],
  },
];

export const getServiceBySlug = (slug?: string) =>
  services.find((s) => s.slug === slug);
