# Integração da v1.7

## Passos

1. Copiar os ficheiros por cima da versão v1.6.
2. Em `src/main.tsx`, acrescentar:

```ts
import "./shared/styles/accessibility.css";
```

3. Aplicar as classes ao `body` sempre que as definições mudarem:

```ts
document.body.classList.toggle(
  "high-contrast",
  settings.highContrast,
);
document.body.classList.toggle(
  "reduced-motion",
  settings.reducedMotion,
);
document.body.classList.toggle(
  "dyslexia-friendly",
  settings.dyslexiaFriendlyFont,
);
```

4. Acrescentar novos ecrãs à navegação:

```text
home
parent-access
parents
profile-management
accessibility-settings
```

5. Instanciar:

- `BrowserParentAccessRepository`
- `BrowserSettingsRepository`
- `UpdateChildProfile`
- `ArchiveChildProfile`

6. Executar:

```bash
npm run typecheck
npm test
npm run dev
```

## Nota sobre IndexedDB

Esta versão prepara os contratos e o plano de migração. A substituição completa de `localStorage` por IndexedDB deve ser feita na v1.8, preservando todas as interfaces da application layer.

## Próxima versão

A v1.8 deverá introduzir:

- implementação IndexedDB;
- migração automática dos dados existentes;
- registo real de duração das sessões;
- recuperação de falhas;
- exportação local de dados para os pais.
