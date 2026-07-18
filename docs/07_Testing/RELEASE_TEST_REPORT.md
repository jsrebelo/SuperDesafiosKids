# Relatório de testes da release

## Versão e ambiente

- Versão: `2.0.0-rc.1`
- Data: 2026-07-18
- Ambiente: Windows, Node.js 24, navegador integrado do Codex

## Testes automatizados

- `npm run typecheck`: aprovado com TypeScript strict.
- `npm test -- --pool=forks --maxWorkers=1`: 18 ficheiros e 28 testes aprovados.
- `npm run build`: aprovado com manifesto, service worker e precache PWA.
- `npm audit`: 0 vulnerabilidades após atualização para Vite 7.

## Testes manuais

- arranque da aplicação em `pt-PT`;
- criação e recuperação de perfil com IndexedDB;
- criação de PIN e entrada na Área dos Pais;
- acesso a gestão de perfis, relatório, importação e exportação;
- persistência de limite diário nas definições;
- aplicação das classes de alto contraste e movimento reduzido;
- manifesto de produção com idioma, modo standalone e ícone;
- service worker de produção com `index.html` e manifesto no precache.

## Problemas e riscos abertos

Consultar `docs/RC_KNOWN_ISSUES.md`.

## Decisão

**Go with known risks** para preview da release candidate. A publicação final requer lint, E2E e validação na matriz de dispositivos.
