# Problemas conhecidos da release candidate

## Resolvidos na finalização

- Manifesto e lockfile npm alinhados numa combinação compatível de React 19, Vite 7, TypeScript 5 e Vitest 4.
- IndexedDB usado pelos fluxos da aplicação como armazenamento principal.
- Migração de perfis, progresso, tentativas, recompensas, utilização diária, definições e PIN do `localStorage` preservada.
- PIN, gestão de perfis, acessibilidade, importação, exportação e relatório ligados à navegação.
- `SessionTracker` ligado ao registo de utilização diária nos jogos de Matemática e Palavras.
- Mocks e testes atualizados para os contratos atuais.
- Geração de opções de palavras protegida contra ciclos infinitos com fontes aleatórias determinísticas.
- Configuração Vite duplicada removida e build PWA consolidado na configuração TypeScript.

## Riscos restantes

- O projeto ainda não tem comando de lint configurado.
- Não existe suite end-to-end automatizada; os fluxos principais foram verificados manualmente no navegador.
- O service worker e o precache foram validados na build de produção, mas a matriz completa de dispositivos e o comportamento offline após atualização continuam a exigir teste manual.
- O ícone PWA é SVG escalável. Antes da publicação nas lojas, devem ser adicionadas variantes PNG específicas exigidas por cada canal.

