# Prompt — Finalizar v2.0.0-rc.1

Analisa o repositório completo do Super Desafios Kids.

Lê primeiro:

- README.md
- docs/RC_KNOWN_ISSUES.md
- docs/01_Product/MVP_SCOPE.md
- docs/01_Product/MVP_REQUIREMENTS.md
- docs/04_Architecture/SYSTEM_ARCHITECTURE.md
- docs/08_AI/CODEX_GUIDE.md
- specifications/MVP_ACCEPTANCE_CRITERIA.md
- docs/RELEASE_CANDIDATE_CHECKLIST.md

Objetivo: transformar esta consolidação num projeto executável e coerente.

Tarefas:

1. Instala dependências.
2. Executa typecheck, testes e build.
3. Corrige conflitos entre versões sem remover funcionalidades.
4. Usa IndexedDB como armazenamento principal e mantém a migração de localStorage.
5. Liga PIN, gestão de perfis, acessibilidade, importação, exportação e relatório à navegação.
6. Liga SessionTracker ao tempo diário.
7. Atualiza mocks e testes para os contratos atuais.
8. Verifica offline, acessibilidade e pt-PT.
9. Não inventes funcionalidades nem alteres a arquitetura sem ADR.
10. No final, apresenta ficheiros alterados, testes executados e problemas restantes.
