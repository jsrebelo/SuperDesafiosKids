# Integração da v1.3

## Passos

1. Copiar os ficheiros para o repositório v1.2.
2. Em `src/main.tsx`, garantir:

```ts
import "./shared/styles/global.css";
import "./shared/styles/math.css";
import "./shared/styles/navigation.css";
```

3. Executar:

```bash
npm run typecheck
npm test
npm run dev
```

## Fluxo final

```text
Perfis
→ Início
→ Matemática
→ Voltar ao início
→ Mudar perfil
```

## Próxima versão

A v1.4 deverá introduzir:

- multiplicação;
- divisão;
- histórico recente;
- recompensas básicas;
- resumo da sessão.
