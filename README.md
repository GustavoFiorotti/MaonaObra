# Mão na Obra

Bem-vindo ao repositório do projeto "Mão na Obra" — um protótipo de aplicação para conectar clientes a profissionais de serviços locais.

## O que tem aqui

- Frontend em React + Vite (TypeScript)
- Componentes UI reutilizáveis em `src/components/ui`
- Telas de Cliente e Profissional em `src/components/client` e `src/components/worker`
- Ativos públicos em `public/images`

## Pré-requisitos

- Node.js 18+ (recomendado)
- npm (ou pnpm/yarn, adaptando os comandos)

## Instalação (rápida)

1. Instale as dependências:

```powershell
npm install
```

2. Inicie o servidor de desenvolvimento (Vite):

```powershell
npm run dev
```

3. Abra o navegador em `http://localhost:5173` (padrão do Vite) para ver o app.

## Estrutura principal

- `src/` - código fonte React + TypeScript
  - `App.tsx` - roteamento de telas internas (welcome, login, telas do cliente e profissional)
  - `components/` - componentes organizados por responsabilidade (client, worker, ui, figma, etc.)
- `public/` - imagens e favicon

# Scripts úteis

- `npm run dev` - inicia o servidor de desenvolvimento
- `npm run build` - produz artefatos para produção (se configurado)
- `npm run preview` - visualiza a build de produção localmente (se configurado)

---

_Gerado/atualizado em 15 de setembro de 2025_
