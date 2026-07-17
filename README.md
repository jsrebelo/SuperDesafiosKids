# Super Desafios Kids — v2.0.0-rc.1 Consolidated Release Candidate

Este pacote reúne num único repositório a documentação e o código produzidos entre as versões v0.5 e v1.9.

## Incluído

- documentação de produto, pedagogia, arquitetura, UI/UX, assets, testes, segurança, release e Codex;
- React, TypeScript e Vite;
- PWA;
- perfis infantis;
- Adaptive Learning Engine;
- Matemática;
- Palavras em pt-PT;
- recompensas;
- tentativas e estatísticas;
- área dos pais;
- acessibilidade;
- IndexedDB e migração de localStorage;
- importação e exportação de dados;
- relatórios imprimíveis/PDF;
- prompts e backlog para o Codex.

## Estado

Esta é uma **release candidate de consolidação**. Todos os ficheiros estão reunidos, mas o projeto deve ser validado pelo Codex antes de ser publicado, executando typecheck, testes e build e resolvendo os pontos em `docs/RC_KNOWN_ISSUES.md`.

## Executar

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

## Primeiro pedido ao Codex

Usa o prompt em `prompts/FINALIZE_RELEASE_CANDIDATE.md`.
