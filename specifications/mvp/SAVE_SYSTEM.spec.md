# SAVE_SYSTEM.spec

## Objetivo

Persistir progresso localmente com segurança.

## Dados

- perfis;
- progresso;
- tentativas;
- sessões;
- recompensas;
- definições.

## Regras

- gravação após cada tentativa;
- operações críticas atómicas;
- migrações versionadas;
- cópia de segurança futura;
- falhas não apagam dados existentes;
- repositório em memória para testes.

## Critérios de aceitação

- [ ] Dados recuperam após reinício.
- [ ] Perfis permanecem isolados.
- [ ] Falha de gravação é tratada.
- [ ] Migração preserva dados.
- [ ] Funciona offline.
