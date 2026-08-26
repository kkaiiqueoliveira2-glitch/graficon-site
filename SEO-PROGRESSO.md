# Progresso do projeto de SEO, GEO e entidade

Registro corrido do trabalho. Cada etapa entra aqui com o que foi feito, o que
foi validado e o que ficou aberto.

Documentos irmãos: `SEO-AUDIT.md` (diagnóstico) e `COMPETITIVE-ANALYSIS.md`
(concorrência).

---

## Status geral

| | |
|---|---|
| Etapa atual | P0 implementado e auditado |
| Publicado em produção | **Não.** Produção roda o commit `4106ece` |
| Commit | **Não.** 6 arquivos modificados no working tree |
| Nota da fundação técnica | 7,5 / 10 |

Combinado com o cliente: executar as etapas uma a uma, verificar tudo no fim,
depois deploy, depois commit.

---

## Etapa 1, auditoria inicial (11/08/2026)

Diagnóstico completo sem alterar código. Gerou `SEO-AUDIT.md` e
`COMPETITIVE-ANALYSIS.md`.

Método: leitura do código, `curl` no HTML servido em produção (sem JavaScript),
medição de Core Web Vitals com Chromium headless em celular emulado com 4G e CPU
4x mais lenta, contagem de requisições com cache desligado, comparação entre
texto visível e JSON-LD, e pesquisa web para presença externa e concorrência.

Não medido, e continua não medido: dados de campo do CrUX (a API do PageSpeed
estourou a cota) e o Search Console (sem acesso).

### Achados classificados

- **P0-1** URL inexistente devolvia 200 com a home inteira (soft 404 infinito)
- **P0-2** As 23 respostas do FAQ existiam só no JSON-LD, nunca no HTML
- **P0-3** `/diferenca-entre-gravacao-e-revestimento-grafico` servia a home
- **P1** `createRoot` sobre HTML pré-renderizado, cache dos assets, hub de
  serviços sem link para os filhos, 4 de 5 segmentos fora do HTML, peso de imagem
- **P2** width/height, zoom bloqueado, aria-label, skip link, `_redirects` do
  Netlify, schema `WebSite`, sitemap com `lastmod` manual, trailing slash

### A descoberta que mudou a estratégia de conteúdo

Cruzando com `clientes/Graficon-Revestimento/saidas/estrategia-google-ads.md`:
os dois leads reais da conta são **rolo de borracha**, e a conversão 1 veio de
`recuperação de cilindros`. No site, "borracha" e "haste hidráulica" só aparecem
como placeholder do formulário. Não existe página, H1 nem serviço para nenhum
dos dois. Daí a recomendação de criar 5 páginas, e não as 18 do briefing.

---

## Etapa 2, implementação do P0 (11/08/2026)

Escopo fechado: só P0. P1 e P2 não foram tocados.

### Arquivos modificados

| Arquivo | Alteração |
|---|---|
| `src/components/ui/accordion.tsx` | `forceMount` no `AccordionContent` |
| `src/index.css` | Recolhimento por altura mais `visibility` no estado fechado |
| `scripts/prerender.mjs` | Gera `dist/404.html` pelo catch-all do React Router |
| `src/pages/NotFound.tsx` | `noindex, nofollow` e remoção do canonical herdado |
| `vercel.json` | `301` + `handle: filesystem` + fallback `status: 404` |
| `src/App.tsx` | Remoção da rota duplicada |

95 linhas adicionadas, 5 removidas.

### Ajuste de rota durante a execução

A premissa inicial era que `forceMount` mantinha o atributo `hidden` do Radix.
**Não mantém.** Sem CSS, as respostas apareceriam todas abertas; e só com
`height: 0` o texto continuaria exposto na árvore de acessibilidade, fazendo um
leitor de tela ler as 5 respostas com o FAQ fechado. Resolvido com
`visibility: hidden` no estado fechado, com atraso de 200ms para casar com a
animação. Confirmado com `page.accessibility.snapshot()`.

---

## Etapa 3, pós-auditoria do P0 (11/08/2026)

Verificação dos 20 pontos pedidos, sem alterar arquivo.

### Resultado

- **P0-2 resolvido e comprovado:** 23/23 respostas no HTML. Na home, "cromo duro"
  saiu de 0 para 1 ocorrência em texto visível e "celulose" de 1 para 4
- **P0-1 e P0-3 resolvidos no código, pendentes de deploy**
- **Layout pixel a pixel idêntico à produção:** 0,00% a 0,56% de diferença em 10
  capturas, com altura de página igual em todas
- **Zero erro de console** em 14 combinações de rota e viewport
- Formulário, WhatsApp, Analytics, sitemap, robots, canonical, metadata,
  indexabilidade, HTML semântico e mobile: todos verificados e íntegros
- Lint idêntico ao HEAD (14 problemas, 3 erros pré-existentes)

### Limite de verificação

O comportamento do `vercel.json` só se prova em deploy. `vercel build` local
falha porque força o caminho serverless do prerender (`@sparticuz/chromium`), que
não roda no Windows. Foi validado o que dava: sintaxe pelo validador oficial
`@vercel/routing-utils` e semântica simulada contra o `dist` real.

### Armadilha de método, para quem repetir o teste

A primeira comparação visual acusou 10% de diferença e imagem sumida no build
local. Era artefato do teste: interceptação de requests do Puppeteer com duas
páginas em paralelo derrubava o carregamento de imagem. Com bloqueio por DNS e
captura sequencial, a diferença caiu para 0,00%.

---

## Etapa 4, P1 estrutural (11/08/2026)

Escopo negociado: a lista de prioridades do cliente para o P1 é toda estrutural
e semântica, e não inclui performance. Dos 5 itens P1 da auditoria, 3 são de
performance e ficaram de fora desta rodada, com aval pedido.

### Implementado

| Item | Arquivo | Efeito medido |
|---|---|---|
| `/o-que-fazemos` linka os 6 serviços | `ServicesSection.tsx` | 6 links, antes 0 |
| Os 5 segmentos no HTML | `SegmentsSection.tsx`, `index.css` | "metalgrafia" 0 → 5 ocorrências, "celulose" 4 → 7, "embalagens" → 9. As 3 descrições que faltavam entraram |
| `BreadcrumbList` nos artigos e institucionais | `usePageSEO.ts` + 6 páginas | Trilha em 7 páginas, antes só nas 6 de serviço |
| Cache imutável em `/assets/*` | `vercel.json` | Entrada em `routes` com `continue: true` |

### Duas regressões que eu mesmo causei e corrigi

1. **`hidden` não escondeu os cards de segmento.** `.segment-carousel-card` usa
   `@apply grid`, que sobrepõe o `display:none` do atributo. Resultado medido:
   5 cards visíveis, home 1.288px mais alta, 64,7% de diferença visual.
   Corrigido com `.segment-carousel-card[hidden] { display: none }`, que tem
   especificidade maior. É o espelho exato do caso do FAQ, onde o problema era
   o oposto.
2. **As 5 imagens de segmento passaram a baixar** (+700 KB na home), mesmo com
   `display:none`. Corrigido montando a `<img>` só do slide ativo. Imagem de
   slide oculto não agrega SEO; o que precisa estar no HTML é o texto.

Depois das correções: alturas de página idênticas à produção, diferença visual
de 0,00% a 0,34%, e contagem de imagens igual à produção (16 e 16).

### Armadilha de medição

Comparar peso total entre preview local e produção não vale: o `vite preview`
serve sem compressão e a Vercel serve brotli. O JS sai com 469.775 bytes local
e comprimido em produção. Comparar contagem de requisições, não KB.

---

## Decisões técnicas que precisam ser lembradas

1. **`vercel.json` usa `routes`, que é mutuamente exclusivo com `headers`,
   `redirects`, `rewrites`, `cleanUrls` e `trailingSlash`.** O cache imutável do
   P1 terá que entrar como entrada do próprio `routes`, com `"continue": true`.
   Usar a chave `headers` quebra o deploy.
2. **Rota nova no `App.tsx` sem entrada no `ROUTES` do `prerender.mjs` agora
   devolve 404 real em produção.** Antes servia a home silenciosamente. É falha
   barulhenta de propósito, mas é mudança de contrato.
3. **`forceMount` foi aplicado no componente compartilhado**, então qualquer
   accordion futuro herda conteúdo sempre montado.
4. O `404.html` herda do `index.html` a description da home, o Open Graph e o
   JSON-LD de `LocalBusiness`. Inerte, porque é noindex e sai com status 404.

---

## Pendências abertas

**Do processo:** deploy e commit, combinados para o fim.

**Lembrete de deploy:** o domínio publica pelo projeto Vercel `graficon-site`,
por push no `master`. Rodar `vercel --prod` nesta pasta atualiza só o projeto
`graficon-industrial-solutions-main` e não mexe no domínio.

**P1, por retorno sobre esforço:** `hydrateRoot`, cache imutável em `/assets/*`,
linkar os 6 serviços a partir de `/o-que-fazemos`, renderizar os 5 segmentos no
HTML, peso de imagem e code splitting.

**P2:** width/height nas 12 imagens, aria-label nos botões do carrossel, skip
link, reavaliar o bloqueio de zoom, remover `public/_redirects`, schema
`WebSite`, nome primário da entidade, sitemap gerado no build, normalizar
trailing slash e `/index.html`, description própria no 404.

**Conteúdo:** criar `/recuperacao-de-cilindros`,
`/revestimento-de-rolos-de-borracha`,
`/recuperacao-de-haste-de-cilindro-hidraulico`, `/segmentos/flexografia` e
`/segmentos/rotogravura`.

**Fora do código, maior retorno de todos:** ativar o Google Meu Negócio e
cadastrar a empresa no Guia do Gráfico, que lista 37 concorrentes e nenhuma
Graficon.

---

## A confirmar com o cliente

- Coordenadas `-23.5996576, -46.5076932` batem com a entrada da fábrica?
- Nome primário: "Graficon Ferramentaria Gráfica" ou "Graficon Revestimento de
  Cilindros"?
- Existe Google Meu Negócio abandonado para reivindicar?
- CNPJ e razão social para diretórios
- Para as páginas de borracha e haste hidráulica: que peças a Graficon aceita,
  medidas máximas e o que fica fora do escopo
- Há fotos próprias de rolo de borracha e haste hidráulica em oficina?
