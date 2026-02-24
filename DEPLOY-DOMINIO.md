# Fazer graficonrevestimento.com mostrar a versão nova

O código já está com as atualizações (+40 anos, links, etc.). O site **graficonrevestimento.com** só não atualiza porque o **domínio precisa estar ligado ao projeto certo** no Vercel e à **Produção** desse projeto.

## Passo a passo no Vercel

### 1. Abrir o projeto certo
- Acesse [vercel.com](https://vercel.com) e faça login.
- Abra o projeto **graficon-industrial-solutions-main** (o que você usou no `npx vercel --prod`).

### 2. Conferir o domínio
- No menu do projeto, clique em **Settings** (Configurações).
- Vá em **Domains**.
- Veja se **graficonrevestimento.com** está na lista.
  - **Se NÃO estiver:** clique em **Add** e adicione `graficonrevestimento.com` (e, se quiser, `www.graficonrevestimento.com`). Siga as instruções de DNS que o Vercel mostrar.
  - **Se JÁ estiver:** o domínio está no projeto certo; o próximo passo é garantir que a **Produção** é o deploy novo.

### 3. Usar o último deploy em Produção
- No menu do projeto, clique em **Deployments** (Implantações).
- Encontre o deploy mais recente (o que você acabou de fazer).
- À direita, abra o menu **⋯** (três pontinhos) desse deploy.
- Clique em **Promote to Production** (Promover para Produção).
- Assim, **graficonrevestimento.com** passa a apontar para esse deploy.

### 4. Limpar cache do navegador
- Depois de promover, abra o site em uma **aba anônima** ou use **Ctrl+Shift+R** (atualização forçada) em graficonrevestimento.com para evitar cache antigo.

---

**Resumo:** O código está certo. No Vercel: 1) domínio no projeto **graficon-industrial-solutions-main**; 2) último deploy **Promote to Production**; 3) testar em aba anônima ou com Ctrl+Shift+R.
