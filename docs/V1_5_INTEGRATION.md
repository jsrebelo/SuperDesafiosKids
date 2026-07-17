# Integração da v1.5

## Passos

1. Copiar os ficheiros por cima da versão v1.4.
2. Em `src/main.tsx`, acrescentar:

```ts
import "./shared/styles/words.css";
```

3. Executar:

```bash
npm run typecheck
npm test
npm run dev
```

## Fluxo acrescentado

```text
Início
→ Palavras
→ observar imagem
→ escolher letra
→ receber feedback e recompensa
→ próximo exercício
```

## Conteúdo inicial

O banco inclui palavras simples e médias para idades dos 5 aos 10 anos.

Os emojis são marcadores temporários. Devem ser substituídos pelos assets originais definidos no Assets Pack.

## Próxima versão

A v1.6 deverá introduzir:

- persistência de tentativas;
- estatísticas partilhadas;
- painel básico dos pais;
- carteira visível no menu;
- limite diário.
