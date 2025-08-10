yarn install --save-dev typescript
yarn install --save-dev @types/react @types/react-dom @types/node

# Marvel HQ Store

Uma loja virtual de HQs Marvel, moderna, responsiva e profissional, criada para o desafio Front-end!

![Marvel HQ Store Banner](public/image/spider.jpg)

## ✨ Funcionalidades

- **Listagem de HQs** com integração à API oficial da Marvel (com fallback para mock)
- **Página de detalhes** de cada HQ
- **Carrinho de compras** com badge, abre/fecha, UX mobile first
- **Cupons de desconto** para HQs comuns e raras
- **Paginação** e busca eficiente
- **Visual profissional** e tema Marvel
- **Totalmente responsivo** (mobile, tablet, desktop)
- **Dockerfile** pronto para deploy
- **Commits organizados** e código limpo

## 🛒 Cupons disponíveis
- `DESCONTO10` — 10% de desconto em HQs comuns
- `RARO20` — 20% de desconto em HQs raras

## 🚀 Como rodar localmente

```bash
git clone https://github.com/jonathandsg104/Marvel-comics-stores.git
cd marvel-hq-store
yarn install
yarn dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

```bash
docker build -t marvel-hq-store .
docker run -p 3000:3000 marvel-hq-store
```

## 🛠️ Tecnologias
- Next.js 15
- Redux Toolkit
- Styled Components
- Cypress (E2E)
- Marvel API
- Docker

## 👨‍💻 Autor
Desafio Front-end © 2025  
Jonathan Gomes

---

> Projeto criado para demonstrar domínio em React, Next.js, responsividade, integração de APIs e UX de alto nível. Sinta-se à vontade para clonar, testar e sugerir melhorias!

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
