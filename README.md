# document-batch-frontend

Interface para gerenciamento de lotes de documentos. Feita com Angular 21 e Bootstrap 5.

## Requisitos

- Node.js 20+
- npm

## Como rodar

```bash
cd document-batch-frontend
npm install
npm start
```

Abre em `http://localhost:4200`. O backend precisa estar rodando em `http://localhost:8080`.

## Funcionalidades

- Listagem de lotes com paginação
- Filtro por status (Todos / Pendente / Exportado / Rejeitado)
- Filtro por operador com debounce de 400ms
- Badge colorido por status (amarelo, verde, vermelho)
- Modal para alterar o status de um lote
- Modal para criar um novo lote
- Feedback de carregamento e mensagem de erro quando o backend está fora

## Estrutura

```
src/app/
├── pages/lotes/            — página principal (listagem + paginação + filtros)
├── components/
│   ├── status-badge/       — badge com cor por status
│   ├── status-modal/       — modal para alterar status
│   └── criar-lote-modal/   — modal para criar lote
├── services/lote.service.ts
└── models/lote.model.ts
```

A URL base da API fica em `src/environments/environment.ts`. Em produção, o arquivo `environment.prod.ts` é usado automaticamente pelo Angular CLI.

## Build de produção

```bash
npm run build
```

Os arquivos ficam em `dist/document-batch-frontend/`.
