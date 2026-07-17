# Integração da v1.6

## Passos

1. Copiar os ficheiros por cima da versão v1.5.
2. Em `src/main.tsx`, acrescentar:

```ts
import "./shared/styles/parents.css";
```

3. Executar:

```bash
npm run typecheck
npm test
npm run dev
```

## Notas

- O histórico de tentativas passa a alimentar o painel dos pais.
- A carteira aparece no menu principal.
- O limite diário é guardado localmente.
- A contagem automática de minutos deve ser refinada na versão seguinte.
- O acesso à área dos pais ainda deve receber PIN ou desafio adulto.

## Próxima versão

A v1.7 deverá introduzir:

- PIN ou desafio para a área dos pais;
- medição real de tempo de sessão;
- edição e arquivo de perfis;
- definições de acessibilidade;
- migração de `localStorage` para IndexedDB.
