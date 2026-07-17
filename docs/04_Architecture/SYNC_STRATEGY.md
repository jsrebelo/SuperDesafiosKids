# SYNC_STRATEGY

**Estado:** Futuro, fora do MVP inicial.

## Objetivo

Sincronizar progresso entre dispositivos mediante consentimento do adulto.

## Princípios

- local é a fonte principal durante a utilização;
- sincronização é eventual;
- conflitos não devem perder tentativas;
- dados infantis exigem consentimento verificável do responsável;
- a aplicação continua funcional sem conta cloud.

## Estratégia de conflito proposta

- tentativas: união por identificador;
- definições: última alteração válida;
- carteira de recompensas: recalculada a partir dos eventos;
- perfil: alteração mais recente, com histórico de conflito.
