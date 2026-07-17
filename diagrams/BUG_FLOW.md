# Fluxo de bug

```mermaid
flowchart LR
    A[New] --> B[Triaged]
    B --> C[Ready]
    C --> D[In Progress]
    D --> E[In Review]
    E --> F[Verified]
    F --> G[Closed]
    F -->|Falhou| H[Reopened]
    H --> D
```
