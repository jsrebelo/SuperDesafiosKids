# Fluxo de navegação infantil

```mermaid
flowchart TD
    A[Selecionar perfil] --> B[Início]
    B --> C[Escolher jogo]
    C --> D[Iniciar sessão]
    D --> E[Responder]
    E --> F[Feedback]
    F --> G{Continuar?}
    G -->|Sim| E
    G -->|Não| H[Resumo e recompensa]
    H --> B
```
