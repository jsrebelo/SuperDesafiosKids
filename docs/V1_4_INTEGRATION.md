# Integração da v1.4

## Passos

1. Copiar os ficheiros por cima da versão v1.3.
2. Em `src/main.tsx`, acrescentar:

```ts
import "./shared/styles/rewards.css";
```

3. Executar:

```bash
npm run typecheck
npm test
npm run dev
```

## Fluxo acrescentado

```text
Matemática
→ responder
→ receber XP e moedas
→ terminar sessão
→ ver resumo
→ continuar ou voltar ao início
```

## Próxima versão

A v1.5 deverá introduzir:

- jogo de palavras;
- banco inicial em pt-PT;
- letra em falta;
- áudio opcional;
- recompensas partilhadas entre jogos.
