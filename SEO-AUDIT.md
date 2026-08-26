# Auditoria de SEO, GEO e Entidade

**Site:** https://graficonrevestimento.com/
**Empresa:** Graficon Ferramentaria Gráfica (Graficon Revestimento de Cilindros)
**Data:** 11/08/2026
**Escopo:** auditoria técnica, de conteúdo, semântica, local, de entidade e GEO. Nenhum arquivo do site foi alterado.

---

## 0. Como esta auditoria foi feita

Tudo aqui foi verificado, não estimado. As fontes:

- Leitura do código em `C:\Users\Administrator\Site Graficon\graficon-industrial-solutions-main\graficon-industrial-solutions-main` (a cópia que publica no domínio).
- `curl` no HTML realmente servido em produção, sem JavaScript, que é o que um rastreador de texto lê.
- Medição de Core Web Vitals com Chromium headless, viewport de celular (390x844), rede 4G (1,6 Mbps, 150 ms de latência) e CPU 4x mais lenta.
- Contagem de requisições de rede com cache desligado.
- Comparação entre o texto visível e o conteúdo declarado no JSON-LD.
- Pesquisa web para verificar presença externa e concorrência.

O PageSpeed Insights da API do Google estourou a cota diária (HTTP 429), então as métricas de laboratório abaixo vêm da medição própria descrita acima. Os números de campo (CrUX) não foram obtidos.

---

## 1. Estado atual

O site está num patamar bem acima da média do setor. Não é um site quebrado que precisa de reconstrução, é um site bom com um conjunto específico de vazamentos.

**Stack:** Vite + React 18 + TypeScript + Tailwind + shadcn/ui, roteamento com React Router, deploy na Vercel. Não é Next.js.

**Geração de páginas:** SPA com pré-renderização própria em `scripts/prerender.mjs`, que roda no `postbuild`. Ele sobe um `vite preview`, visita 14 rotas com Puppeteer e grava o HTML final em `dist/<rota>/index.html`. Confirmado funcionando em produção: `/sobre` e `/servicos/galvanizacao-e-cromo` chegam com title, canonical, H1 e JSON-LD corretos sem executar JavaScript.

**Rotas registradas** (`src/App.tsx`): 10 padrões, sendo `/servicos/:slug` com 6 serviços em `src/data/services.ts`. Total de 14 URLs indexáveis mais a rota curinga.

### O que já está correto e não deve ser mexido

Esta lista importa tanto quanto a de problemas. Mexer aqui só piora.

| Item | Situação |
|---|---|
| `robots.txt` | Correto e bem pensado. Libera explicitamente GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, meta-externalagent. Declara o sitemap. Não bloqueia nada sem motivo. |
| `llms.txt` | Existe, está completo e é honesto. Inclui uma seção "Observações para quem cita esta página" que instrui o modelo a não atribuir certificações, prazos ou números inventados. Isso é raro e é exatamente a prática certa para GEO. |
| `sitemap.xml` | 14 URLs, todas canônicas, todas 200, nenhuma noindex, nenhum redirect. Bate com a lista de rotas do prerender. |
| Entidade `LocalBusiness` | Com `@id` estável (`/#empresa`), `alternateName`, `knowsAbout`, `hasOfferCatalog`, `geo`, `openingHoursSpecification`, `contactPoint`. As páginas de serviço amarram nela via `provider: {"@id": ".../#empresa"}`. Arquitetura de entidade correta. |
| `BreadcrumbList` | Presente nas páginas de serviço. |
| HTTPS e redirects | `http://` responde 308 e `www.` responde 307, ambos para o domínio canônico. Correto. |
| Consistência de NAP | Nome, telefone `+55 11 91529-1313`, e-mail e endereço batem entre HTML, JSON-LD e `llms.txt`. |
| Ausência de `Review`/`AggregateRating` no schema | Correto. Os depoimentos aparecem na página mas não são declarados como schema de avaliação, o que evitaria uma penalidade por avaliação auto atribuída. Não adicionar. |
| Estratégia dos botões "Perguntar à IA" | Usam pergunta técnica de decisão de compra, não pergunta de reputação. Está certo enquanto a empresa não tiver presença fora do próprio domínio. Ver seção 8. |
| Analytics adiado | GA4 e Meta Pixel só baixam após a primeira interação, com stub que enfileira eventos. Preserva conversões sem competir com o LCP. Boa engenharia, manter. |
| Formulário de orçamento | Já coleta empresa, responsável, WhatsApp, peça, diâmetro, comprimento e descrição. É exatamente a qualificação que o briefing pede. Só falta upload de foto. |
| Cards CMYK fora da paleta | Decisão de marca já confirmada, referência ao CMYK do setor gráfico. Não "corrigir" para azul. |

---

## 2. Problemas críticos (P0)

### P0-1. Qualquer URL inexistente devolve HTTP 200 com a home inteira

Verificado:

```
GET /pagina-que-nao-existe  ->  HTTP 200 | 140.395 bytes
title:      Revestimento de Cilindros | Graficon ...
canonical:  https://graficonrevestimento.com/
```

`vercel.json` reescreve `/(.*)` para `/index.html`. Como `/index.html` é a home **pré-renderizada**, todo endereço errado do site entrega a home completa com status de sucesso.

Consequências reais:

- Soft 404 em escala infinita. Link quebrado, URL antiga, varredura de scanner, tudo vira uma página 200 com conteúdo.
- Desperdício de rastreamento. O Google baixa 140 KB por URL inventada.
- O componente `NotFound.tsx` nunca aparece no HTML. Ele só renderiza depois que o JavaScript roda, então o rastreador jamais vê um sinal de 404.
- O canonical apontando para `/` evita indexação duplicada, o que segura o dano, mas não resolve o sinal errado de status.

**Correção:** gerar um `dist/404.html` no prerender e configurar a Vercel para servi-lo com status 404 nas rotas não conhecidas, trocando o rewrite genérico por uma lista das rotas reais mais um fallback 404.

### P0-2. Nenhuma resposta de FAQ existe no HTML, só dentro do JSON-LD

Este é o achado de conteúdo mais grave.

O componente de FAQ usa o Accordion do Radix, que **desmonta** o conteúdo fechado. Como o prerender captura a página com todos os itens fechados, o HTML publicado contém as perguntas e nenhuma resposta.

Verificado na home, procurando fora das tags `<script>`:

```
"camada técnica sobre o cilindro"     -> NÃO está no HTML
"Recuperamos cilindros desgastados"   -> NÃO está no HTML
```

E na página de serviço:

```
"A galvanização deposita uma camada metálica"      -> NÃO está no HTML
"O cromo duro é muito usado para devolver a medida" -> NÃO está no HTML
```

São **23 respostas técnicas** perdidas (5 na home + 3 em cada uma das 6 páginas de serviço). É o melhor conteúdo do site, escrito para responder exatamente as perguntas que o briefing lista, e nenhum rastreador de texto ou modelo de linguagem enxerga uma linha disso.

Efeito colateral: o `FAQPage` declara conteúdo que não está visível na página, o que contraria a diretriz do Google de que dados estruturados devem representar conteúdo presente. Hoje isso é risco de desqualificação do schema, não penalidade.

Sintoma mensurável da perda: o termo "cromo duro" aparece **0 vez** no texto visível da home e 2 vezes no JSON-LD.

**Correção:** renderizar as respostas no HTML. As duas saídas boas são usar `forceMount` no `AccordionContent` com ocultação por CSS (o texto fica no DOM), ou trocar o padrão por `<details>/<summary>` nativo, que é rastreável, acessível e não custa JavaScript.

### P0-3. A rota `/diferenca-entre-gravacao-e-revestimento-grafico` serve a home

O `App.tsx` registra dois caminhos para o mesmo componente:

```
/diferenca-entre-gravacao-e-revestimento          (pré-renderizada, correta)
/diferenca-entre-gravacao-e-revestimento-grafico  (não está no prerender)
```

Verificado em produção: a segunda devolve 200 com o title e o canonical **da home**. Quem tem JavaScript vê o artigo; o rastreador vê a home num endereço que promete outro assunto.

**Correção:** decidir qual é a URL boa e redirecionar a outra com 301. Se a segunda existe por causa de link antigo, ela precisa virar redirect, não rota duplicada.

---

## 3. Problemas importantes (P1)

### P1-1. O React descarta o HTML pré-renderizado e baixa tudo de novo

`src/main.tsx` usa `createRoot` em vez de `hydrateRoot`. O comentário no arquivo documenta a escolha (evitar mismatch de markup responsivo) e afirma que não há flash perceptível. A medição contradiz a parte do custo:

Requisições com cache desligado em `/servicos/galvanizacao-e-cromo`:

```
2x  svc-galvanizacao.webp          (é justamente o elemento de LCP)
2x  logo-graficon-horizontal.webp
3x  92zatBhPNqw73oTd4g.woff2       (fonte)
```

O `createRoot` joga fora a árvore estática e reconstrói tudo, então as imagens que já estavam pintadas são requisitadas outra vez. O resultado em celular:

| Rota | LCP | TBT | CLS |
|---|---|---|---|
| `/` | 2.260 ms | 2.387 ms | 0,019 |
| `/servicos/galvanizacao-e-cromo` | **6.056 ms** | 811 ms | 0,000 |

LCP de 6 segundos numa página comercial é o pior número do site. O CLS está ótimo, isso não é problema.

**Correção:** migrar para `hydrateRoot` e resolver o markup responsivo por CSS (renderizar os dois menus e alternar com media query) em vez de por JavaScript. É o que remove a repintura e a maior parte do TBT de uma vez.

### P1-2. Assets com hash sem cache de longa duração

```
GET /assets/index-BGukWVex.js
Cache-Control: public, max-age=0, must-revalidate
```

O nome do arquivo já tem hash de conteúdo, então ele é imutável por definição. Servir com `max-age=0` obriga uma revalidação por asset a cada visita. Deveria ser `public, max-age=31536000, immutable`.

**Correção:** bloco `headers` no `vercel.json` para `/assets/*`.

### P1-3. A página "O que fazemos" não linka nenhuma página de serviço

`ServicesSection.tsx` monta os 6 cards como `<div>`, sem link. Ou seja, o hub de serviços, que é inclusive o destino do nível 2 do breadcrumb ("Início > Serviços > Galvanização e Cromo"), não aponta para nenhum dos seus filhos.

Hoje as páginas de serviço só recebem link da home e da lista "outros serviços" dentro de cada página de serviço. O breadcrumb promete uma hierarquia que a navegação não entrega.

**Correção:** transformar os cards de `/o-que-fazemos` em `<Link to={/servicos/${slug}}>`, com âncora descritiva.

### P1-4. Quatro dos cinco segmentos não existem no HTML

`SegmentsSection.tsx` é um carrossel que renderiza **um** segmento por vez. Os outros quatro só existem como `aria-label` dos pontinhos de navegação. As descrições não existem em lugar nenhum do HTML.

Impacto na entidade, medido por contagem de ocorrências em texto visível contra JSON-LD:

| Termo | `/o-que-fazemos` texto visível | no JSON-LD |
|---|---|---|
| rotogravura | 0 | 2 |
| papel e celulose | 0 | 1 |
| embalagens | 0 | 1 |
| metalgrafia | 0 | 0 |

O site declara ao Google que atende rotogravura, mas não escreve "rotogravura" em lugar nenhum da página de serviços. Schema não substitui texto: ele confirma o que o texto diz.

**Correção:** renderizar os 5 segmentos no HTML (grade que vira carrossel só visualmente, ou carrossel com todos os slides no DOM).

### P1-5. Peso da home

Medido em celular, cache desligado: **1.236 KB em 26 requisições**, sendo 769 KB de imagem.

Recursos mais pesados:

```
220 KB  cilindros-quem-somos.webp   (chega em 9.646 ms)
138 KB  index-BGukWVex.js           (bundle único, 468 KB descomprimido)
108 KB  hero-industrial-C3M0bWHE.webp   (1920w)
105 KB  fbevents.js
 78 KB  graficas-flexografia.webp
```

Três coisas específicas:

1. `cilindros-quem-somos.webp` tem 220 KB para exibir 1100x733. Cabe em algo perto de 60 KB.
2. O hero baixa **dois** tamanhos do srcset (1280w e 1920w). Só um é usado.
3. As imagens em `public/` não passam pelo `vite-imagetools` (que só processa o que é importado do `src/`), então nenhuma tem srcset. São as 6 dos serviços, as 5 de segmentos e as 4 dos cards CMYK.
4. Bundle único de 468 KB sem divisão por rota: quem abre a home baixa o código das 6 páginas de serviço e dos 4 artigos.

---

## 4. Melhorias recomendadas (P2 e P3)

| # | Item | Evidência | Prioridade |
|---|---|---|---|
| P2-1 | `/sobre/` e `/sobre` respondem 200 as duas | Verificado. O canonical resolve a duplicação, mas o certo é 308 de uma para a outra | P2 |
| P2-2 | 12 das 17 imagens da home sem `width`/`height` | Contado no HTML publicado. O CLS está bom hoje por causa do CSS, mas o atributo é a garantia | P2 |
| P2-3 | Zoom bloqueado no celular | `user-scalable=no, maximum-scale=1.0` mais bloqueio de pinch por JavaScript. Falha WCAG 1.4.4. Foi decisão deliberada, mas custa acessibilidade num público industrial que tende a ser mais velho | P2 |
| P2-4 | Botões `‹` e `›` do carrossel sem `aria-label` | 2 botões só com o caractere. Leitor de tela lê "‹" | P2 |
| P2-5 | Sem skip link | Não existe "pular para o conteúdo" | P2 |
| P2-6 | `public/_redirects` é arquivo do Netlify | Inerte na Vercel. Lixo que induz a erro em manutenção futura | P2 |
| P2-7 | Falta schema `WebSite` | Ajuda a consolidar a entidade do domínio | P2 |
| P2-8 | `meta keywords` na home | Ignorada por buscadores desde 2009. Não faz mal, mas sinaliza SEO antigo | P3 |
| P2-9 | `lastmod` fixo em 2026-08-10, escrito à mão | Vai envelhecer sem ninguém perceber. Gerar o sitemap no build | P2 |
| P3-1 | Alt genérico nos cards de serviço | `alt="Galvanização e Cromo"` repete o título. Podia descrever a foto | P3 |
| P3-2 | Sem `hreflang` | Correto não ter. Site monolíngue, não criar | não fazer |

---

## 5. Auditoria de entidade

A entidade está bem construída **dentro** do site e inexistente **fora** dele.

**Dentro:** consistente. Nome, telefone, e-mail, endereço e descrição batem em HTML, JSON-LD e `llms.txt`. O `@id` `https://graficonrevestimento.com/#empresa` é estável e os serviços referenciam ele. Isso é o desenho correto.

**Um ponto a resolver:** o site usa dois nomes. O `<title>`, o `og:site_name` e o `SITE_NAME` do hook dizem "Graficon Revestimento de Cilindros"; o `LocalBusiness.name` e o `llms.txt` dizem "Graficon Ferramentaria Gráfica". Os dois estão em `alternateName`, então não é erro, mas convém decidir qual é o nome primário e usar ele como `name` em todos os lugares, deixando o outro como alternativo.

**Fora:** `sameAs` tem uma única URL, o Instagram. Pesquisando na web em 11/08/2026, a situação da memória do projeto se mantém em parte e mudou em parte:

- Pesquisando o termo genérico "revestimento de cilindros São Paulo", **o site da Graficon aparece nos resultados** junto com Rolobras, Allborplass, Sanborr e agregadores. Isso é novo e é bom sinal.
- Continua **sem nenhuma fonte de terceiro** que descreva a empresa: nenhum diretório setorial, nenhuma avaliação externa, nenhuma citação em portal do setor. Tudo que os buscadores dizem sobre a Graficon foi lido do próprio site.

Isso é a maior fragilidade estratégica do projeto e não se resolve com código.

---

## 6. Auditoria de SEO local

| Sinal | Situação |
|---|---|
| Endereço no HTML | Sim, na home ("Bairro dos Eucaliptos" confirmado no HTML publicado) |
| `PostalAddress` no schema | Sim, completo |
| `geo` com coordenadas | Sim, `-23.5996576, -46.5076932`. **Conferir com o cliente se batem com a porta da fábrica**, porque estão no schema e no mapa |
| Horário de funcionamento | Sim, segunda a quinta 08h às 18h, sexta 08h às 15h |
| `areaServed` | Sim, cidade, estado e país |
| Mapa incorporado | Sim, `GoogleMapEmbed.tsx` |
| Página `/contato` própria | **Não existe.** Contato é âncora `/#contato` na home |
| Google Meu Negócio | **Não localizado.** Este é o item de maior retorno da lista inteira |

Sobre páginas de cidade: o briefing pergunta se vale criar `/revestimento-de-cilindros-em-sao-paulo/`. **A recomendação é não criar.** O `<title>` da home já é "Revestimento de Cilindros | Graficon, Recuperação e Revestimento Industrial em São Paulo", a home já carrega endereço, mapa e `LocalBusiness`. Uma página separada com a mesma intenção seria quase duplicata e competiria com a própria home. O ganho local vem do Google Meu Negócio, não de mais uma URL.

---

## 7. Auditoria de conteúdo e a maior oportunidade do site

O conteúdo existente é bom: técnico, específico, sem enrolação, sem promessa vaga. Os 4 artigos e as 6 páginas de serviço demonstram conhecimento real.

**O buraco está em outro lugar, e os dados pagos apontam ele com precisão.**

Segundo `clientes/Graficon-Revestimento/saidas/estrategia-google-ads.md`, com a coluna de conversões aberta em 28/07/2026:

- Conversão 1: `recuperação de cilindros` (ampla)
- Conversão 2: `"revestimento de cilindro de borracha"` (frase)
- **Os dois leads reais são rolo/cilindro de borracha** (um moinho de dois rolos e uma gráfica)
- Existe também eixo hidráulico validado: `cromo em haste`, `recuperação de haste de cilindro`

Agora o que o site tem sobre isso:

```
"borracha"  no código: só placeholder do formulário e 2 menções soltas em artigos
"haste"     no código: só placeholder do formulário e o llms.txt
```

**Não existe nenhuma página, nenhum H1, nenhum serviço sobre rolo de borracha ou haste hidráulica.** Os dois segmentos que geraram 100% dos leads reais da conta de Ads não têm onde aterrissar no site orgânico. Isso é a recomendação de conteúdo número um, e ela não vem de suposição de palavra-chave, vem de conversão registrada.

Segundo ponto: **não há página com intenção "recuperação"**. A palavra aparece espalhada, mas a arquitetura é toda organizada por processo (galvanização, usinagem, prova). O comprador não pesquisa "prova e análise", ele pesquisa "recuperação de cilindro". A keyword `recuperação de cilindros` foi a que gerou a conversão 1 e não tem página própria.

---

## 8. Auditoria GEO (mecanismos de resposta com IA)

A base técnica de GEO está feita e está entre as melhores que se vê em PME: `llms.txt` honesto, `robots.txt` liberando rastreadores de IA de forma explícita, entidade com `@id`, schema `Service` amarrado à empresa, e tudo isso dentro de HTML pré-renderizado, que é o que um rastreador que não roda JavaScript consegue ler.

**O que está furando o GEO hoje é o P0-2.** Um modelo de linguagem lê o texto da página. As 23 respostas de FAQ, que são justamente o material escrito no formato de pergunta e resposta que os mecanismos de resposta mais usam, não estão no texto. Estão só no JSON-LD, que parte dos rastreadores de IA nem processa. Corrigir o accordion é a ação de maior impacto em GEO do plano inteiro, e é barata.

O mesmo vale para o P1-4: um modelo perguntado sobre "empresa de revestimento de cilindros para rotogravura" lê a página de serviços da Graficon e não encontra a palavra "rotogravura".

Sobre os botões "Perguntar à IA": a decisão de usar pergunta técnica em vez de pergunta de reputação continua correta, porque a verificação de presença externa (seção 5) confirma que nenhum modelo tem fonte independente sobre a empresa. Trocar para pergunta de reputação só depois que existir Google Meu Negócio ativo e alguma citação de terceiro.

---

## 9. Matriz de intenção

| Query | Intenção | Página ideal | Existe hoje | Prioridade |
|---|---|---|---|---|
| revestimento de cilindros | comercial | `/` | sim | ok |
| recuperação de cilindros | comercial | `/recuperacao-de-cilindros` | **não** | **alta** |
| revestimento de cilindro de borracha | comercial, converteu | `/revestimento-de-rolos-de-borracha` | **não** | **alta** |
| recuperação de rolo de borracha | comercial, converteu | mesma página acima | **não** | **alta** |
| cromo em haste de cilindro hidráulico | comercial, validado no Ads | `/recuperacao-de-haste-hidraulica` | **não** | **alta** |
| revestimento de cilindros São Paulo | local, comercial | `/` (já cobre) | sim | não criar página nova |
| cromo duro em cilindro | comercial | `/servicos/galvanizacao-e-cromo` | sim | ok |
| empresa de revestimento de cilindros para flexografia | comercial, segmento | `/segmentos/flexografia` | parcial (carrossel) | média |
| empresa de revestimento de cilindros para rotogravura | comercial, segmento | `/segmentos/rotogravura` | **não, nem no texto** | média |
| como funciona o revestimento de cilindros | informacional | `/como-funciona-revestimento-de-cilindros` | sim | ok |
| diferença entre recuperação e revestimento | informacional | artigo | parcial | média |
| quando vale recuperar em vez de comprar novo | informacional, alta conversão | artigo novo | **não** | média |
| cilindro perdeu medida, o que fazer | informacional, dor real | `/problemas-desgaste-cilindros-graficos` | parcial | média |
| usinagem de cilindros | comercial | `/servicos/usinagem-e-fabricacao` | sim | ok |
| onde recuperar cilindro em São Paulo | local | Google Meu Negócio + `/` | **GMB não existe** | **alta** |

---

## 10. Arquitetura de páginas recomendada

Princípio aplicado: só entra página com intenção própria e conteúdo que a Graficon tem autoridade real para escrever. O briefing lista cerca de 18 candidatas; a recomendação é criar **5**, e apenas essas.

**Criar:**

1. `/recuperacao-de-cilindros` — intenção comercial distinta de "revestimento", e é a keyword que converteu. Estrutura: o que é, quando um cilindro pode ser recuperado, como saber se perdeu medida, o que a Graficon avalia, quando não compensa recuperar, FAQ, CTA.
2. `/revestimento-de-rolos-de-borracha` — os dois leads reais vieram daqui e não existe página. Cobrir reencape, cilindro emborrachado, borrachamento de rolos, moinho de dois rolos.
3. `/recuperacao-de-haste-de-cilindro-hidraulico` — eixo validado no Ads, e o `llms.txt` já explica que a haste hidráulica cai no mesmo processo de cromo duro. Só falta a página.
4. `/segmentos/flexografia` e `/segmentos/rotogravura` — os dois segmentos gráficos com vocabulário próprio. Os outros três segmentos (papel e celulose, embalagens, metalgrafia) ficam como seção no HTML, sem página própria, até haver conteúdo real que os sustente.

**Não criar** (evita quase duplicata):
`/empresa` (já é `/sobre`), `/cilindros-industriais` (canibaliza a home), `/revestimento-de-cilindros-em-sao-paulo` e `/recuperacao-de-cilindros-em-sao-paulo` (a home já cobre o local), `/faq` (o FAQ está distribuído e é melhor assim; primeiro corrigir o P0-2), `/orcamento` separado (o formulário da home já qualifica bem).

**Avaliar depois:** `/contato` própria (ajuda em SEO local, custo baixo) e `/blog` só se houver quem alimente. O concorrente Policromo mantém blog, e é o único do setor que faz conteúdo com constância.

---

## 11. Dados estruturados recomendados

| Schema | Onde | Situação |
|---|---|---|
| `LocalBusiness` | home | existe e está bom, manter |
| `Service` | páginas de serviço | existe, amarrado ao `@id` da empresa, manter |
| `BreadcrumbList` | páginas de serviço | existe, estender para os artigos |
| `FAQPage` | home e serviços | existe, mas **precisa que a resposta apareça no HTML** (P0-2) |
| `Article` | artigos | existe via `usePageSEO` |
| `WebSite` | home | **adicionar**, com `name`, `url` e `publisher` apontando para `#empresa` |
| `WebPage` | páginas institucionais | existe |
| `Review` / `AggregateRating` | qualquer | **não adicionar.** Avaliação auto declarada é risco sem retorno |
| `Product` | qualquer | não se aplica, é serviço |

Não inventar: sem `priceRange` mais específico que o `$$` atual, sem certificação, sem número de funcionários, sem data de fundação. O "+40 anos" é tempo de profissão, e o `llms.txt` já registra isso corretamente.

---

## 12. Plano de implementação por prioridade

### P0 — fazer primeiro (impacto alto, esforço baixo)

1. Renderizar as respostas do FAQ no HTML (`forceMount` ou `<details>`). Recupera 23 blocos de conteúdo técnico e é a maior alavanca de GEO.
2. Servir 404 de verdade: gerar `dist/404.html` e trocar o rewrite genérico do `vercel.json` por rotas conhecidas mais fallback 404.
3. Resolver `/diferenca-entre-gravacao-e-revestimento-grafico` com 301 para a URL canônica.

### P1 — na sequência

4. `hydrateRoot` no lugar de `createRoot`, com o menu responsivo resolvido por CSS. Elimina a dupla requisição de imagem e derruba LCP e TBT.
5. `Cache-Control: immutable` para `/assets/*` no `vercel.json`.
6. Linkar os 6 serviços a partir de `/o-que-fazemos`.
7. Renderizar os 5 segmentos no HTML, com as descrições.
8. Imagens: recomprimir `cilindros-quem-somos.webp`, corrigir o `sizes` do hero para não baixar dois tamanhos, gerar srcset para as imagens de `public/`.
9. Dividir o bundle por rota com `React.lazy`.

### P2 — arrumação

10. `width`/`height` nas 12 imagens que faltam.
11. `aria-label` nos botões do carrossel, skip link, e reavaliar o bloqueio de zoom.
12. Remover `public/_redirects`.
13. Adicionar schema `WebSite`; padronizar o nome primário da entidade.
14. Gerar `sitemap.xml` no build, com `lastmod` automático.
15. 308 para normalizar trailing slash.

### P1 de conteúdo (paralelo ao técnico)

16. Criar `/recuperacao-de-cilindros`.
17. Criar `/revestimento-de-rolos-de-borracha`.
18. Criar `/recuperacao-de-haste-de-cilindro-hidraulico`.
19. Criar `/segmentos/flexografia` e `/segmentos/rotogravura`.

### Fora do código, e é o de maior retorno

20. **Ativar o Google Meu Negócio.** É o que destrava busca local, Maps, e dá à Graficon a primeira fonte sobre si mesma fora do próprio domínio. Depois disso, entrar em diretórios setoriais legítimos (Guia do Gráfico, por exemplo) e acrescentar as URLs confirmadas ao `sameAs`.

---

## 13. Itens a confirmar com o cliente

- **[COORDENADAS A CONFIRMAR]** `-23.5996576, -46.5076932` batem com a entrada da fábrica?
- **[INFORMAÇÃO A CONFIRMAR]** Nome primário da entidade: "Graficon Ferramentaria Gráfica" ou "Graficon Revestimento de Cilindros"?
- **[INFORMAÇÃO A CONFIRMAR]** Existe Google Meu Negócio, mesmo que não verificado ou abandonado? Reivindicar um perfil existente é mais rápido que criar do zero.
- **[INFORMAÇÃO A CONFIRMAR]** Existe CNPJ e razão social para usar em diretórios e no perfil do Google?
- **[INFORMAÇÃO A CONFIRMAR]** Para as páginas novas de borracha e haste hidráulica: quais peças a Graficon realmente aceita, que medidas máximas atende e o que fica fora do escopo? Sem isso, o conteúdo dessas páginas não pode passar de genérico, e página genérica não merece ser citada.
- **[INFORMAÇÃO A CONFIRMAR]** Há fotos próprias de rolo de borracha e de haste hidráulica em oficina? O `roteiro-captacao-fotos.md` já existe na pasta do cliente e pode ser estendido.

---

## 14. O que esta auditoria não mediu

Para não passar segurança onde não há:

- **Dados de campo (CrUX).** A cota da API do PageSpeed estourou. As métricas da seção P1-1 são de laboratório, com emulação de celular e rede lenta. Servem para comparar e priorizar, não são o que o Google registra dos usuários reais.
- **Search Console.** Não houve acesso. Impressões, consultas reais, cobertura de índice e erros de rastreamento reportados pelo Google ficaram de fora, e é a primeira coisa a olhar depois desta auditoria.
- **Concorrência em profundidade.** Ver `COMPETITIVE-ANALYSIS.md`, que é um levantamento inicial, não um estudo completo de backlinks (não houve ferramenta de link disponível).
