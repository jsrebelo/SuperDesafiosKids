export const indexedDbPlan = {
  databaseName: "super-desafios-kids",
  version: 1,
  stores: [
    "profiles",
    "progress",
    "attempts",
    "rewards",
    "dailyUsage",
    "settings",
  ],
} as const;

/**
 * Este ficheiro documenta a próxima migração.
 * A implementação completa deve substituir gradualmente os repositórios
 * baseados em localStorage, mantendo os mesmos contratos da application layer.
 */
