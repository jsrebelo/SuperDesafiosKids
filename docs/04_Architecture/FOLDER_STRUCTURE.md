# FOLDER_STRUCTURE

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes/
│   └── providers/
├── domain/
│   ├── profiles/
│   ├── learning/
│   ├── exercises/
│   ├── rewards/
│   ├── sessions/
│   └── statistics/
├── application/
│   ├── use-cases/
│   ├── ports/
│   └── dto/
├── infrastructure/
│   ├── storage/
│   ├── audio/
│   ├── clock/
│   ├── identifiers/
│   └── sync/
├── features/
│   ├── profiles/
│   ├── home/
│   ├── math-game/
│   ├── word-game/
│   ├── differences-game/
│   ├── rewards/
│   └── parents/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
├── assets/
├── localization/
└── tests/
```

## Regras

- `domain` não depende de outras pastas.
- `application` depende apenas de `domain`.
- `infrastructure` implementa portas de `application`.
- `features` usa casos de utilização e componentes partilhados.
- Código reutilizado por três ou mais funcionalidades deve ser avaliado para `shared`.
- Não criar ficheiros genéricos como `helpers.ts` sem responsabilidade clara.
