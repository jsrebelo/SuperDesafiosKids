# Integração da v1.2

1. Copiar estes ficheiros para o repositório v1.1.
2. Adicionar em `src/main.tsx`:

```ts
import "./shared/styles/math.css";
```

3. Criar no ponto de composição:

```ts
const progressRepository = new BrowserProgressRepository();
const engine = new AdaptiveLearningEngine();
const submitMathAnswer = new SubmitMathAnswer(
  progressRepository,
  engine,
);
```

4. Mostrar `MathGameScreen` depois da seleção do perfil.

A navegação completa será adicionada na próxima versão.
