# Análise de concorrência

**Empresa:** Graficon Ferramentaria Gráfica
**Data:** 11/08/2026
**Complementa:** `SEO-AUDIT.md`

---

## Aviso sobre o alcance desta análise

Este é um levantamento inicial feito com pesquisa web e leitura das páginas dos concorrentes. **Não houve acesso a ferramenta de backlinks** (Ahrefs, Semrush ou similar), então nada aqui mede autoridade de domínio, volume de busca ou perfil de links. Onde aparece estimativa, está marcado como tal. Nenhum conteúdo de concorrente foi copiado.

---

## 1. O mercado se divide em três grupos, e isso muda a estratégia

A primeira coisa que a pesquisa revela é que "revestimento de cilindros" não é um mercado só. São três, com concorrentes diferentes e vocabulário diferente.

### Grupo A: emborrachamento e revestimento de borracha
O mais concorrido de longe. O diretório Guia do Gráfico lista **cerca de 37 empresas** só nessa categoria: Rubbercity, Rolobras, Sanborr, Allborplass, Rolo Graf, Revecel, Art Rubber, MAC-ROLL, Uniroll, entre muitas outras. Vocabulário: emborrachamento, reencape, rolo de borracha, poliuretano.

### Grupo B: cromo duro e retífica industrial
Concorrentes: Policromo (Portal do Cromo Duro), Marquez Cromo Duro e Retífica, Sulcromo, Itamarati Metal, Cylerscrew. Vocabulário: cromo duro, cromagem, retífica cilíndrica, brunimento, recuperação de haste, cilindro hidráulico. Costumam falar com metalúrgica, usina, siderurgia e automotivo, não com gráfica.

### Grupo C: ferramentaria gráfica
O nicho onde a Graficon se posiciona. Concorrentes: ABC Equipamentos Gráficos, Mecânica Tecnográfica, Celigraf, Rolotipo. Vocabulário: cilindro de impressão, flexografia, rotogravura, cilindro gráfico.

**A implicação estratégica é direta.** A Graficon é uma das poucas que atravessa os três: faz cromo duro (grupo B), atende rolo de borracha (grupo A) e é ferramentaria gráfica de origem (grupo C). Os concorrentes de cada grupo tendem a ser especialistas de um só. Hoje o site comunica bem o grupo C, razoavelmente o B e **quase nada do A**, que é justamente de onde vieram os dois leads reais do Google Ads.

Isso não é argumento para virar generalista. É argumento para que o site diga, com página própria, que a mesma empresa resolve os três, o que remove o problema real do comprador industrial: coordenar três fornecedores para uma peça só.

---

## 2. Onde a Graficon está hoje

| Sinal | Situação verificada |
|---|---|
| Aparece na busca por termo genérico | **Sim.** Em "revestimento de cilindros São Paulo", o site aparece ao lado de Rolobras, Sanborr e Allborplass |
| Citada por fonte de terceiro | **Não.** Nenhum diretório, nenhuma avaliação externa, nenhuma menção em portal do setor |
| No diretório Guia do Gráfico | **Não está listada.** O diretório aceita cadastro |
| Em agregadores (Soluções Industriais) | **Não localizada.** Vários concorrentes estão |
| Google Meu Negócio | **Não localizado** |
| Blog ativo | Não. Tem 4 artigos técnicos fixos, sem publicação contínua |

Em resumo: a Graficon já disputa a busca genérica com um site tecnicamente melhor que a média do setor, mas é a única do grupo que não existe em lugar nenhum além do próprio domínio.

---

## 3. Comparação site a site

| Empresa | Estrutura do site | Conteúdo | Onde a Graficon ganha | Onde perde |
|---|---|---|---|---|
| **Policromo** (Portal do Cromo Duro) | Site amplo, com blog ativo e guias ("Recuperação de Cilindro: Guia Completo") | **O mais forte em conteúdo do setor.** Publica com constância | Dados estruturados, entidade, GEO, clareza de contato | Volume e frequência de conteúdo. É o único fazendo SEO de conteúdo a sério |
| **Rolobras** | 5 itens de menu (Home, Empresa, Blog, Serviços, Contato), endereço visível em Arujá SP | Blog presente, 36 anos de mercado, cita certificações | Profundidade técnica por serviço, schema, FAQ | Tem blog e cita certificação (a Graficon não declara nenhuma) |
| **Marquez Cromo Duro** | Site simples, páginas por aplicação | Tem página específica para "Indústria Gráfica, Papel e Celulose" | Estrutura, performance, dados estruturados | Marquez tem **página por segmento**, a Graficon tem carrossel que nem aparece no HTML |
| **Sanborr / Allborplass / Rubbercity** | Sites de borracha, muitas páginas por variação de termo | Conteúdo raso, repetitivo, feito para ranquear | Qualidade de conteúdo e honestidade técnica | Cobrem o vocabulário de borracha inteiro; a Graficon não cobre nenhum |
| **Cylerscrew** | Site com endereço em São Paulo, foco em cilindros e roscas | Explica processo de recuperação | Clareza e arquitetura | Explica "como é a recuperação" com página própria |

---

## 4. O que os concorrentes cobrem e a Graficon não

Termos que aparecem com destaque nos títulos dos concorrentes e que não têm página no site da Graficon:

| Termo | Quem cobre | Situação na Graficon |
|---|---|---|
| recuperação de cilindro | Policromo, Cylerscrew, Marquez | Sem página. **Foi a keyword da conversão 1 do Ads** |
| revestimento de rolo de borracha, emborrachamento, reencape | 37 empresas do Guia do Gráfico | Sem página. **Segmento dos 2 leads reais** |
| recuperação de haste de cilindro hidráulico | Policromo, Sulcromo, Marquez | Sem página. Só citado no `llms.txt` |
| retífica cilíndrica, brunimento | Policromo, Marquez | Não citado |
| rotogravura | Itamarati, Marquez | **0 ocorrência no texto visível de `/o-que-fazemos`** |
| certificação e norma | Rolobras | Não declarado (e não deve ser inventado) |
| blog com publicação contínua | Policromo, Rolobras | Não existe |

---

## 5. O que a Graficon faz melhor que todos eles

Vale registrar, porque é o ativo a defender:

1. **Dados estruturados e entidade.** Nenhum concorrente examinado tem `LocalBusiness` com `@id` estável, `hasOfferCatalog` e `Service` amarrado ao provedor. A Graficon tem.
2. **`llms.txt` honesto.** Nenhum concorrente tem. E o da Graficon inclui instrução explícita para o modelo não atribuir certificações ou prazos inventados, o que é a prática correta e rara.
3. **`robots.txt` liberando rastreadores de IA de forma explícita.** Nenhum concorrente examinado fez isso.
4. **HTML pré-renderizado.** O conteúdo é legível sem JavaScript nas 14 rotas.
5. **Qualificação no formulário.** Pede peça, diâmetro, comprimento e descrição. Os concorrentes pedem nome e e-mail. Isso é vantagem comercial, não só de SEO.
6. **Honestidade técnica no texto.** Sem preço fantasia, sem prazo prometido, sem número inventado. Num setor onde o padrão é página genérica cheia de superlativo, isso é o que faz um conteúdo merecer ser citado por um mecanismo de resposta.

---

## 6. Oportunidades que ninguém do setor cobre

Buracos reais de conteúdo, onde a Graficon tem autoridade para escrever e a concorrência não escreveu:

1. **"Quando vale recuperar em vez de comprar novo"** com critério técnico de decisão, não com discurso de venda. Ninguém do setor publicou isso de forma útil.
2. **"Como saber se o cilindro perdeu medida"**, com o que medir e o que exigir do fornecedor. O artigo de desgaste chega perto mas não fecha.
3. **A ponte entre borracha e cromo.** Nenhum concorrente explica quando a peça pede reencape de borracha e quando pede cromo duro, porque cada um só vende um dos dois. A Graficon faz os dois e pode escrever a comparação com isenção. É o conteúdo mais defensável do site inteiro.
4. **Diagnóstico do que deu errado**, escrito a partir dos casos reais que chegam pelo comercial: causa do desgaste, o que acontece quando não se corrige a causa antes de revestir. O material do `preparacao-tecnica-e-tratamentos` já aponta nessa direção.

---

## 7. Ações recomendadas, por retorno sobre esforço

### Retorno alto, esforço baixo
1. **Google Meu Negócio.** É o único jeito de existir em busca local e no Maps, e resolve a fragilidade de ser a única empresa do grupo sem fonte externa.
2. **Cadastro no Guia do Gráfico.** Diretório setorial legítimo, aceita cadastro, tem 37 concorrentes e nenhum Graficon. Depois de cadastrada, a URL entra no `sameAs`.
3. **Corrigir o FAQ oculto** (P0-2 da auditoria). Recupera 23 respostas técnicas que hoje nenhum buscador nem modelo lê.

### Retorno alto, esforço médio
4. **Páginas de `/recuperacao-de-cilindros`, borracha e haste hidráulica.** Não é aposta em palavra-chave, é cobrir onde o dinheiro do Ads já provou que existe demanda.
5. **Páginas de segmento para flexografia e rotogravura**, com o texto realmente no HTML.

### Retorno de médio prazo
6. **Publicação contínua**, se houver quem escreva. O Policromo é o único do setor fazendo isso, e é por isso que aparece em consulta informacional. Um artigo por mês, técnico e específico, já muda o jogo num mercado assim.

---

## 8. O que não copiar da concorrência

- **Páginas por variação de termo.** Sanborr e Allborplass têm dezenas de URLs quase idênticas ("revestimento de cilindros", "empresa de revestimento de cilindros", "indústria de revestimento de cilindros"). Isso ranqueava em 2015. Hoje só divide força e vira conteúdo raso.
- **Certificações e números sem lastro.** Concorrentes citam norma e certificação genericamente. A Graficon não deve declarar nada que não tenha documento.
- **Páginas de cidade em série.** Nenhum ganho real e risco de conteúdo fino.
- **Depoimento transformado em schema de avaliação.** Vários fazem. É avaliação auto declarada e o Google desconsidera ou penaliza.

---

## 9. Fontes consultadas

- [Guia do Gráfico, categoria revestimento de cilindros](https://www.guiadografico.com.br/produtos-e-servicos/categoria/revestimento-de-cilindros)
- [Rolobras](https://www.rolobras.com.br/)
- [Policromo, Portal do Cromo Duro](https://www.policromo.com.br/recuperacao-de-cilindro)
- [Policromo, Recuperação de Cilindro: Guia Completo](https://www.policromo.com.br/blog/categorias/artigos/recuperacao-de-cilindro-guia-completo)
- [Marquez Cromo Duro, Indústria Gráfica, Papel e Celulose](http://www.marquez.com.br/industria-grafica-papel-celulose)
- [Sulcromo, recuperação e revestimento de cilindros laminadores](https://www.sulcromo.com.br/noticias-cromo-duro/recuperacao-e-revestimento-de-cilindros-laminadores/)
- [Cylerscrew](https://www.cylerscrew.com.br/)
- [Itamarati Metal, revestimento de cromo duro](https://www.itamaratimetal.com.br/revestimento-cromo-duro)
- [Sanborr](https://www.sanborr.com.br/revestimento-cilindros)
- [Allborplass](https://www.allborplass.com.br/revestimento-cilindro.php)
- [Soluções Industriais, revestimento de cilindros em SP](https://produtos.solucoesindustriais.com.br/equipamentos-materiais-maquinario-ferramentas-materiais/cilindros-equipamentos-materiais/solucoes-industriais/empresa-de-revestimento-de-cilindros-em-sp)
- Dados de conversão: `clientes/Graficon-Revestimento/saidas/estrategia-google-ads.md`
