# Arquitetura de conteúdo V2

**Empresa:** Graficon Ferramentaria Gráfica
**Data:** 11/08/2026
**Escopo:** análise da arquitetura de conteúdo. Nenhum arquivo do site foi alterado.
**Complementa:** `SEO-AUDIT.md`, `COMPETITIVE-ANALYSIS.md`, `SEO-PROGRESSO.md`

---

## 0. Como esta análise foi feita

Não é opinião sobre o que "deveria" existir. Cada afirmação abaixo saiu de
medição no HTML publicado:

- Contagem de palavras e extração da árvore de headings do `<main>` de cada página
- Comparação de similaridade textual entre os artigos, por blocos de 8 palavras
- Mapeamento dos links internos que saem do corpo de cada página, ignorando
  header e footer (que linkam tudo em todas)
- Dados de conversão reais do Google Ads (`clientes/Graficon-Revestimento/saidas/estrategia-google-ads.md`)

---

## 1. O diagnóstico que organiza todo o resto

### Achado 1: quatro artigos disputam a mesma consulta

Os quatro artigos técnicos têm praticamente o **mesmo esqueleto de H2**:

| H2 | como-funciona | o-que-e | diferenca | problemas |
|---|:---:|:---:|:---:|:---:|
| O que é revestimento gráfico | sim | sim | sim | sim |
| Para que serve o revestimento gráfico | sim | sim | sim | sim |
| Como funciona o revestimento de cilindros | sim | sim | sim | sim |
| Principais benefícios | não | sim | sim | sim |
| Problemas causados pela ausência ou má execução | sim | sim | sim | sim |
| Quando contratar empresa especializada | sim | sim | sim | sim |

**Importante, e corrige uma leitura apressada:** o texto **não** é copiado. A
sobreposição literal fica entre 5% e 14%, e cada página tem de 81% a 85% de
texto exclusivo. São paráfrases, não duplicatas.

Isso não melhora a situação, piora de um jeito diferente. Conteúdo duplicado o
Google resolve escolhendo um e ignorando os outros. Quatro páginas
**parafraseadas cobrindo a mesma intenção** competem entre si sem que nenhuma
acumule autoridade, e um mecanismo de resposta que lê as quatro recebe quatro
versões equivalentes da mesma explicação, sem saber qual citar.

O que cada uma tem de fato exclusivo:

| Página | Palavras | Bloco realmente próprio |
|---|---|---|
| `/como-funciona-revestimento-de-cilindros` | 723 | **As 6 etapas do processo** (inspeção do núcleo, preparação, definição de material e espessura, aplicação, tratamento e usinagem, controle final) e os tipos de revestimento. Conteúdo técnico real |
| `/diferenca-entre-gravacao-e-revestimento` | 963 | **"O que é gravação e como difere"**, com adição contra remoção de material. Pergunta legítima e distinta |
| `/o-que-e-revestimento-grafico` | 981 | "Definição técnica" e "aplicação na indústria gráfica". É a abertura da página de processo, escrita de novo |
| `/problemas-desgaste-cilindros-graficos` | 824 | **Nenhum.** Os 7 H2 são o esqueleto genérico. O H1 promete diagnóstico de desgaste e o corpo entrega o artigo padrão |

### Achado 2: os artigos são becos sem saída

Links internos saindo do corpo de cada página, excluindo header e footer:

```
/                                          9 links (2 artigos + 6 serviços + sobre)
/o-que-fazemos                             6 links (os 6 serviços)
/servicos/galvanizacao-e-cromo             4 links
/como-funciona-revestimento-de-cilindros   NENHUM
/o-que-e-revestimento-grafico              NENHUM
/diferenca-entre-gravacao-e-revestimento   NENHUM
/problemas-desgaste-cilindros-graficos     NENHUM
/sobre                                     NENHUM
```

Os quatro artigos são exatamente as páginas que capturam busca informacional, e
são as únicas que não empurram ninguém para nada comercial. Quem chega
perguntando "como funciona o revestimento de cilindros" lê a resposta e sai.

### Achado 3: a arquitetura ignora o eixo que converte

O site é organizado por **processo interno** (galvanização, usinagem, prova e
análise). O comprador não pesquisa por processo interno. Ele pesquisa pelo
**problema que tem na mão**.

Os dados pagos são inequívocos: as duas conversões da conta vieram de
`recuperação de cilindros` e `"revestimento de cilindro de borracha"`, e **os
dois leads reais são rolo de borracha**. Existe ainda o eixo hidráulico
validado (`cromo em haste`, `recuperação de haste de cilindro`).

No site, "borracha" e "haste hidráulica" aparecem **somente como placeholder do
formulário**. Não existe página, H1 nem serviço para nenhum dos dois.

### Achado 4: os dois hubs são finos

`/o-que-fazemos` tem 147 palavras e `/sobre` tem 186. `/o-que-fazemos` é o
destino do nível 2 do breadcrumb de todas as páginas de serviço, e é uma grade
de 6 cards com uma frase cada.

---

## 2. O princípio que resolve: três eixos, sem canibalização

A tentação natural é criar uma página para cada palavra-chave. Isso gera
canibalização. A saída é organizar por **eixos que não se cruzam**, cada um
respondendo uma pergunta diferente do comprador.

| Eixo | Pergunta do comprador | Páginas |
|---|---|---|
| **Processo** | "o que vocês fazem?" | `/o-que-fazemos` e as 6 de `/servicos/` |
| **Peça e problema** | "eu tenho esta peça com este defeito, vocês resolvem?" | `/recuperacao-de-cilindros` e as 2 filhas (novas) |
| **Segmento** | "vocês atendem o meu tipo de indústria?" | `/segmentos/flexografia` e `/segmentos/rotogravura` (novas) |
| **Educacional** | "me explica isso antes de eu decidir" | os 3 artigos que sobrevivem |

Uma peça pode aparecer em três eixos sem competir, porque o **title, o H1 e a
intenção** são diferentes em cada um. O que não pode existir é duas páginas
respondendo a mesma pergunta.

---

## 3. Respostas às 10 perguntas

### 3.1 Quais páginas devem permanecer

| Página | Papel | Situação |
|---|---|---|
| `/` | Entidade, serviço principal e SEO local | Mantém, é a página mais forte do site |
| `/servicos/galvanizacao-e-cromo` | Cromo duro e galvanização | Mantém |
| `/servicos/preparacao-tecnica-e-tratamentos` | Diagnóstico e correção dimensional | Mantém |
| `/servicos/processos-de-revestimento` | Tipos de revestimento e aplicação da camada | Mantém |
| `/servicos/usinagem-e-fabricacao` | Usinagem e fabricação sob medida | Mantém |
| `/servicos/cilindros-especiais` | Peças fora do padrão | Mantém |
| `/servicos/prova-e-analise` | Controle de qualidade final | Mantém |
| `/como-funciona-revestimento-de-cilindros` | Processo, em 6 etapas | Mantém e absorve outra |
| `/diferenca-entre-gravacao-e-revestimento` | Comparação | Mantém |
| `/sobre` | Autoridade e prova | Mantém, precisa crescer |
| `/privacidade` | Legal | Mantém como está |

### 3.2 Quais páginas precisam ser melhoradas

**`/o-que-fazemos`, prioridade alta.** 147 palavras para o hub de serviços é
pouco demais para uma página que é nível 2 de todos os breadcrumbs. Precisa de
um texto de abertura que diga o que a Graficon faz, para quem, com que tipos de
peça, e precisa linkar também para o eixo de peça e para os segmentos. Hoje só
linka os 6 serviços (corrigido na etapa P1).

**`/problemas-desgaste-cilindros-graficos`, prioridade alta.** O H1 promete
diagnóstico e o corpo entrega o artigo genérico. É a página mais próxima das
consultas "cilindro perdeu medida, o que fazer" e "como saber se o cilindro
está desgastado", que são de alta intenção comercial. Reescrever em torno de
sintomas observáveis: variação de espessura na impressão, falha de transferência
de tinta, marcas repetitivas, vibração, perda de medida. Cada sintoma apontando
para a causa provável e para o serviço correspondente.

**`/sobre`, prioridade média.** 186 palavras. É a página de E-E-A-T da empresa,
e a Graficon tem 40 anos de história que não estão escritos.
[INFORMAÇÃO A CONFIRMAR COM O CLIENTE: ano de início da operação, número de
funcionários, parque de máquinas, capacidade dimensional máxima, certificações
se houver.]

**As 6 páginas de serviço, prioridade média.** Estão boas. Falta duas coisas:
linkar para o eixo de peça (hoje só linkam entre si e para o hub) e incorporar
o vocabulário real do cliente, que hoje só existe no `llms.txt` e no formulário
(rolo de borracha, haste hidráulica, reencape, cilindro emborrachado).

### 3.3 Quais páginas devem ser criadas

Cinco. Não mais que isso, e nenhuma delas é variação de palavra-chave: cada uma
responde uma pergunta que hoje não tem resposta no site.

1. `/recuperacao-de-cilindros`
2. `/revestimento-de-rolos-de-borracha`
3. `/recuperacao-de-haste-de-cilindro-hidraulico`
4. `/segmentos/flexografia`
5. `/segmentos/rotogravura`

Especificação completa de cada uma na seção 4.

### 3.4 Quais páginas estão competindo pela mesma intenção

| Conflito | Gravidade | Resolução |
|---|---|---|
| `/o-que-e-revestimento-grafico` **x** `/como-funciona-revestimento-de-cilindros` | **Alta.** Os dois abrem com "O que é revestimento gráfico" e depois com "Como funciona". Mesma intenção, texto reescrito | Unificar |
| `/problemas-desgaste-cilindros-graficos` **x** os outros três | **Alta.** Não tem nenhum bloco próprio; hoje é uma quarta versão do mesmo artigo | Reescrever para a intenção que o H1 promete |
| `/diferenca-entre-gravacao-e-revestimento` **x** `/como-funciona...` | **Baixa.** Compartilha o esqueleto, mas o bloco de comparação é legítimo e distinto | Manter, enxugar o que se repete |
| `/o-que-fazemos` **x** `/` | **Baixa.** A home repete a grade de serviços. Não é a mesma intenção: a home é entidade e local, o hub é catálogo | Manter os dois, diferenciar o texto |
| `/servicos/processos-de-revestimento` **x** `/` | **Média.** Os dois falam de "revestimento de cilindros" | A home é a canônica de "revestimento de cilindros". A página de serviço deve focar em **tipos** de revestimento e escolha técnica |

### 3.5 Quais páginas deveriam ser unificadas

**Uma só: `/o-que-e-revestimento-grafico` deve ser absorvida por
`/como-funciona-revestimento-de-cilindros`, com 301.**

Por quê: a definição é a abertura natural da página de processo, que já tem um
H2 "O que é revestimento gráfico". A página de processo tem o conteúdo
exclusivo (as 6 etapas); a de definição tem 981 palavras que reexplicam o mesmo
sem nada próprio. Unificadas, viram a página de referência sobre o processo, e é
essa que passa a acumular autoridade e a ser citável.

O que preservar da página absorvida: a seção "Definição técnica" e a de
"Aplicação na indústria gráfica", que entram como os dois primeiros H2 da página
de destino.

Cuidados: 301 de `/o-que-e-revestimento-grafico` para o destino, atualizar o
link da home e do footer, retirar a URL do `sitemap.xml` e do `llms.txt`.

### 3.6 Quais páginas são desnecessárias

**Nenhuma para excluir.** `/privacidade` é obrigatória e está correta.

Registro do que **não** deve ser criado, porque a tentação vai aparecer:

- `/empresa` (já é `/sobre`)
- `/cilindros-industriais` (canibaliza a home, que já é a canônica do tema)
- `/revestimento-de-cilindros-em-sao-paulo` e `/recuperacao-de-cilindros-em-sao-paulo` (a home já é a página local; ver 3.9)
- `/faq` (o FAQ está distribuído e funciona melhor assim, agora que as respostas estão no HTML)
- `/orcamento` (o formulário da home já qualifica com peça, diâmetro, comprimento e descrição)
- Páginas por cidade da Grande São Paulo
- `/segmentos/embalagens`, `/segmentos/papel-e-celulose` e `/segmentos/metalgrafia` **por enquanto** (ver 3.8)

### 3.7 Página principal de cada serviço

| Serviço / tema | Página canônica | Observação |
|---|---|---|
| Revestimento de cilindros (tema-mãe) | `/` | A home é a canônica. Nenhuma página de serviço deve disputar este termo |
| Recuperação de cilindros | `/recuperacao-de-cilindros` (nova) | Intenção distinta de "revestimento": peça existente, com defeito |
| Cromo duro e galvanização | `/servicos/galvanizacao-e-cromo` | Já é canônica e está bem posicionada |
| Tipos e processos de revestimento | `/servicos/processos-de-revestimento` | Focar em **escolha do tipo**, não em "revestimento" genérico |
| Diagnóstico e correção dimensional | `/servicos/preparacao-tecnica-e-tratamentos` | |
| Usinagem e fabricação de cilindros | `/servicos/usinagem-e-fabricacao` | |
| Cilindros especiais e fora do padrão | `/servicos/cilindros-especiais` | |
| Controle de qualidade e medição | `/servicos/prova-e-analise` | |
| Rolo de borracha, reencape, emborrachamento | `/revestimento-de-rolos-de-borracha` (nova) | Segmento dos 2 leads reais |
| Haste de cilindro hidráulico, cromo em haste | `/recuperacao-de-haste-de-cilindro-hidraulico` (nova) | Eixo validado no Ads |

### 3.8 Página principal de cada segmento

| Segmento | Página canônica | Justificativa |
|---|---|---|
| Flexografia | `/segmentos/flexografia` (nova) | Vocabulário próprio (anilox, camisa, fotopolímero, dureza Shore) e volume de busca comercial |
| Rotogravura | `/segmentos/rotogravura` (nova) | Vocabulário próprio (gravação, cromagem da camisa, cilindro base) e hoje aparece **0 vez** no texto visível de `/o-que-fazemos` |
| Embalagens e cartonagem | Seção da home, sem página própria | Descreve o cliente, não uma diferença técnica de processo |
| Papel e celulose | Seção da home, sem página própria | Idem |
| Metalgrafia e automação | Seção da home, sem página própria | Idem |
| Plásticos e indústria geral | Seção da home, sem página própria | Idem |

Os quatro últimos passaram a existir no HTML da home na etapa P1. Promover
qualquer um deles a página própria **só quando houver conteúdo real**: caso de
cliente, foto da peça, exigência técnica específica do segmento.
[INFORMAÇÃO A CONFIRMAR COM O CLIENTE: há casos reais documentáveis em
embalagens ou em papel e celulose?]

### 3.9 Página principal de SEO local

**A home, `/`. Não criar página de cidade.**

Motivos: o `<title>` já é "Revestimento de Cilindros | Graficon, Recuperação e
Revestimento Industrial em São Paulo"; a home já carrega endereço completo,
mapa, telefone, horário e o `LocalBusiness` com `@id` estável e `geo`. Uma
página `/revestimento-de-cilindros-em-sao-paulo` teria a mesma intenção da home
e competiria com ela.

O que realmente destrava o local não é página, é **Google Meu Negócio**, que
não existe. Depois dele, citação em diretório setorial legítimo. A Graficon não
está no Guia do Gráfico, que lista 37 concorrentes na categoria e aceita
cadastro.

### 3.10 Como deve funcionar a linkagem interna

**Regra 1: todo artigo precisa de saída comercial.** Hoje os quatro têm zero
links no corpo. Cada artigo deve linkar, dentro do texto e não só num botão no
fim, para a página de serviço ou de peça correspondente ao que acabou de
explicar.

**Regra 2: o fluxo vai do problema para o serviço, nunca o contrário.**

```
Busca informacional            Busca de problema           Busca comercial
"como funciona"          →     "cilindro perdeu medida"  →  "recuperação de cilindros"
/como-funciona-...             /problemas-desgaste-...      /recuperacao-de-cilindros
                                                                    ↓
                                                            /servicos/galvanizacao-e-cromo
                                                                    ↓
                                                            formulário e WhatsApp
```

**Regra 3: hub aponta para filho e filho aponta de volta.** Já vale para
`/o-que-fazemos` e os 6 serviços, depois da etapa P1. Deve valer também para
`/recuperacao-de-cilindros` e suas duas filhas.

**Regra 4: âncoras descritivas e variadas.** Nunca repetir "clique aqui" nem
martelar a mesma âncora exata. Usar a linguagem do comprador: "recuperar um rolo
de borracha", "repor camada de cromo duro", "corrigir a medida do cilindro".

**Regra 5: segmento linka para peça e para serviço.** `/segmentos/flexografia`
aponta para `/revestimento-de-rolos-de-borracha` e para
`/servicos/galvanizacao-e-cromo`, porque é isso que um flexografista contrata.

**Regra 6: os artigos se citam entre si no máximo uma vez cada.** Evita o
carrossel de links internos entre páginas educacionais que hoje já se
sobrepõem.

---

## 4. Especificação das páginas novas

### 4.1 `/recuperacao-de-cilindros`

| Campo | Conteúdo |
|---|---|
| **URL** | `/recuperacao-de-cilindros` |
| **TITLE** | Recuperação de Cilindros Industriais em São Paulo \| Graficon |
| **H1** | Recuperação de cilindros industriais: quando vale a pena e como funciona |
| **INTENÇÃO** | Comercial, com forte componente de decisão |
| **PALAVRA-CHAVE PRINCIPAL** | recuperação de cilindros |
| **PERGUNTAS QUE RESPONDE** | Quando um cilindro pode ser recuperado? Quando compensa recuperar em vez de comprar novo? Como sei que meu cilindro perdeu medida? O que a Graficon avalia antes de orçar? Que informações preciso enviar? Cilindro recuperado dura quanto? |
| **OBJETIVO COMERCIAL** | Capturar a intenção que já converteu no Ads e levar ao formulário técnico ou ao WhatsApp |
| **LINKAM PARA ELA** | `/` (bloco de serviços), `/o-que-fazemos`, `/problemas-desgaste-cilindros-graficos`, `/como-funciona-revestimento-de-cilindros`, as 6 páginas de serviço, footer |
| **ELA LINKA PARA** | `/revestimento-de-rolos-de-borracha`, `/recuperacao-de-haste-de-cilindro-hidraulico`, `/servicos/galvanizacao-e-cromo`, `/servicos/preparacao-tecnica-e-tratamentos`, `/servicos/prova-e-analise`, `/#contato` |

Estrutura sugerida: o que é recuperação e como difere de revestimento; sinais de
que o cilindro precisa; critérios técnicos de decisão entre recuperar e comprar
novo; o que a Graficon avalia; o que enviar para orçamento; limites (quando não
compensa); FAQ; CTA.
[INFORMAÇÃO A CONFIRMAR COM O CLIENTE: existe um critério objetivo de descarte,
por exemplo perda de diâmetro acima de X mm ou trinca no núcleo?]

### 4.2 `/revestimento-de-rolos-de-borracha`

| Campo | Conteúdo |
|---|---|
| **URL** | `/revestimento-de-rolos-de-borracha` |
| **TITLE** | Revestimento e Recuperação de Rolos de Borracha \| Graficon SP |
| **H1** | Revestimento e recuperação de rolos de borracha |
| **INTENÇÃO** | Comercial. **Foi a origem dos dois leads reais da conta de Ads** |
| **PALAVRA-CHAVE PRINCIPAL** | revestimento de rolo de borracha |
| **VARIAÇÕES REAIS** | recuperação de rolo de borracha, cilindro emborrachado, borrachamento de rolos, reencape de borracha, revestimento de cilindros em borracha |
| **PERGUNTAS QUE RESPONDE** | Dá para reencapar um rolo já usado? Qual borracha para cada aplicação? Como é medida a dureza? O núcleo precisa estar íntegro? Quanto tempo dura? Atende moinho de dois rolos e gráfica? |
| **OBJETIVO COMERCIAL** | Cobrir o segmento que mais converteu e que hoje não tem nenhuma página |
| **LINKAM PARA ELA** | `/recuperacao-de-cilindros` (pai), `/o-que-fazemos`, `/segmentos/flexografia`, `/servicos/processos-de-revestimento`, footer |
| **ELA LINKA PARA** | `/recuperacao-de-cilindros`, `/servicos/prova-e-analise`, `/servicos/usinagem-e-fabricacao`, `/#contato` |

[INFORMAÇÃO A CONFIRMAR COM O CLIENTE: quais compostos a Graficon aplica, faixa
de dureza Shore atendida, diâmetro e comprimento máximos, e se há limite de peso
da peça. Sem isso a página não passa de genérica, e página genérica não merece
ser citada.]

### 4.3 `/recuperacao-de-haste-de-cilindro-hidraulico`

| Campo | Conteúdo |
|---|---|
| **URL** | `/recuperacao-de-haste-de-cilindro-hidraulico` |
| **TITLE** | Recuperação de Haste de Cilindro Hidráulico com Cromo Duro \| Graficon |
| **H1** | Recuperação de haste de cilindro hidráulico com cromo duro |
| **INTENÇÃO** | Comercial. Eixo validado no Ads (`cromo em haste`, `recuperação de haste de cilindro`) |
| **PALAVRA-CHAVE PRINCIPAL** | recuperação de haste de cilindro hidráulico |
| **PERGUNTAS QUE RESPONDE** | Haste riscada ou com corrosão tem recuperação? Como funciona a reposição da camada de cromo? Precisa retificar antes? Quando a haste não tem mais recuperação? Recuperar sai mais barato que comprar nova? |
| **OBJETIVO COMERCIAL** | Abrir o eixo hidráulico, hoje invisível no site apesar de a empresa executar o serviço |
| **LINKAM PARA ELA** | `/recuperacao-de-cilindros` (pai), `/servicos/galvanizacao-e-cromo`, `/o-que-fazemos`, footer |
| **ELA LINKA PARA** | `/servicos/galvanizacao-e-cromo`, `/servicos/usinagem-e-fabricacao`, `/recuperacao-de-cilindros`, `/#contato` |

O `llms.txt` já registra que "a haste hidráulica é cromada, então cai no mesmo
processo de cromo duro dos cilindros gráficos". Esse é o argumento central da
página e já está validado pela empresa.
[INFORMAÇÃO A CONFIRMAR COM O CLIENTE: comprimento máximo de haste atendido.]

### 4.4 `/segmentos/flexografia`

| Campo | Conteúdo |
|---|---|
| **URL** | `/segmentos/flexografia` |
| **TITLE** | Cilindros e Rolos para Flexografia \| Graficon São Paulo |
| **H1** | Revestimento e recuperação de cilindros para flexografia |
| **INTENÇÃO** | Comercial por segmento |
| **PALAVRA-CHAVE PRINCIPAL** | cilindros para flexografia |
| **PERGUNTAS QUE RESPONDE** | Que revestimento a flexografia exige? Como a dureza afeta a transferência de tinta? Que defeitos de impressão vêm do rolo? Atende gráfica de embalagem flexível? |
| **OBJETIVO COMERCIAL** | Falar a língua do flexografista e levar ao eixo de peça |
| **LINKAM PARA ELA** | `/` (seção de segmentos), `/o-que-fazemos`, `/servicos/processos-de-revestimento`, footer |
| **ELA LINKA PARA** | `/revestimento-de-rolos-de-borracha`, `/servicos/galvanizacao-e-cromo`, `/recuperacao-de-cilindros`, `/#contato` |

### 4.5 `/segmentos/rotogravura`

| Campo | Conteúdo |
|---|---|
| **URL** | `/segmentos/rotogravura` |
| **TITLE** | Cilindros para Rotogravura: Revestimento e Recuperação \| Graficon |
| **H1** | Cilindros para rotogravura: revestimento, cromagem e recuperação |
| **INTENÇÃO** | Comercial por segmento |
| **PALAVRA-CHAVE PRINCIPAL** | cilindros para rotogravura |
| **PERGUNTAS QUE RESPONDE** | Qual a diferença entre gravação e revestimento no cilindro de roto? A Graficon grava ou só reveste? Como é a cromagem do cilindro de rotogravura? Dá para recuperar cilindro base? |
| **OBJETIVO COMERCIAL** | Ocupar um termo que o site declara no schema e não escreve no texto |
| **LINKAM PARA ELA** | `/` (seção de segmentos), `/o-que-fazemos`, `/diferenca-entre-gravacao-e-revestimento`, footer |
| **ELA LINKA PARA** | `/diferenca-entre-gravacao-e-revestimento`, `/servicos/galvanizacao-e-cromo`, `/recuperacao-de-cilindros`, `/#contato` |

**Atenção, e é o ponto mais delicado desta página:** o site nunca afirma que a
Graficon faz gravação de cilindros, e o artigo de diferença trata gravação como
processo distinto.
[INFORMAÇÃO A CONFIRMAR COM O CLIENTE: a Graficon faz gravação de cilindro de
rotogravura, ou apenas revestimento, cromagem e recuperação? A resposta muda o
H1 e o corpo inteiro da página. Não escrever esta página antes da resposta.]

---

## 5. Mapa final da arquitetura

```
/                                              entidade + revestimento de cilindros + SEO local
│
├── /o-que-fazemos                             hub de processo  [melhorar]
│   ├── /servicos/galvanizacao-e-cromo
│   ├── /servicos/preparacao-tecnica-e-tratamentos
│   ├── /servicos/processos-de-revestimento
│   ├── /servicos/usinagem-e-fabricacao
│   ├── /servicos/cilindros-especiais
│   └── /servicos/prova-e-analise
│
├── /recuperacao-de-cilindros                  hub de peça e problema  [NOVA]
│   ├── /revestimento-de-rolos-de-borracha     [NOVA]
│   └── /recuperacao-de-haste-de-cilindro-hidraulico  [NOVA]
│
├── /segmentos/flexografia                     [NOVA]
├── /segmentos/rotogravura                     [NOVA, depende de confirmação]
│
├── /como-funciona-revestimento-de-cilindros   absorve /o-que-e-revestimento-grafico
├── /diferenca-entre-gravacao-e-revestimento
├── /problemas-desgaste-cilindros-graficos     [reescrever]
│
├── /sobre                                     [expandir]
└── /privacidade
```

De 14 URLs indexáveis para 18: uma sai por unificação, cinco entram.

---

## 6. Ordem de execução recomendada

| Ordem | Ação | Por quê primeiro |
|---|---|---|
| 1 | `/recuperacao-de-cilindros` | Intenção que já converteu e não tem página |
| 2 | `/revestimento-de-rolos-de-borracha` | Origem dos dois leads reais |
| 3 | Unificar `/o-que-e-revestimento-grafico` com 301 | Resolve a canibalização mais grave, custo baixo |
| 4 | Links internos no corpo dos artigos | Destrava 4 páginas que hoje não convertem nada |
| 5 | Reescrever `/problemas-desgaste-cilindros-graficos` | Alta intenção, conteúdo hoje genérico |
| 6 | `/recuperacao-de-haste-de-cilindro-hidraulico` | Eixo validado, depende de pouca confirmação |
| 7 | `/segmentos/flexografia` | Segmento com vocabulário próprio |
| 8 | Expandir `/o-que-fazemos` e `/sobre` | Sustentação do hub e E-E-A-T |
| 9 | `/segmentos/rotogravura` | **Bloqueada** até a confirmação sobre gravação |

Nada disso substitui o item de maior retorno do projeto, que não é conteúdo:
**ativar o Google Meu Negócio** e conseguir a primeira citação fora do próprio
domínio.

---

## 7. Perguntas que precisam de resposta antes de escrever

1. A Graficon faz **gravação** de cilindro de rotogravura, ou só revestimento, cromagem e recuperação?
2. Rolos de borracha: compostos aplicados, faixa de dureza Shore, diâmetro e comprimento máximos, limite de peso
3. Haste hidráulica: comprimento máximo atendido
4. Existe critério objetivo de descarte, quando a peça não tem mais recuperação?
5. `/sobre`: ano de início, tamanho da equipe, parque de máquinas, capacidade dimensional máxima, certificações
6. Há casos reais documentáveis em embalagens ou em papel e celulose, que justifiquem promover esses segmentos a página própria?
7. Fotos próprias de rolo de borracha e de haste hidráulica em oficina (o `roteiro-captacao-fotos.md` já existe na pasta do cliente e pode ser estendido)

Sem 1, 2 e 3, as páginas correspondentes só podem ser genéricas. E o
`COMPETITIVE-ANALYSIS.md` mostra que o setor inteiro já é genérico: é
exatamente aí que a Graficon consegue se diferenciar, e é por isso que não vale
publicar sem esses dados.
