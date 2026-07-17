# ARCHITECTURE_RULES

## Dependências permitidas

```text
Presentation → Application → Domain
Infrastructure → Application / Domain contracts
```

## Regras

- `domain` não importa React, Phaser, navegador ou base de dados.
- `application` coordena casos de utilização.
- `infrastructure` implementa interfaces.
- `features` não acedem diretamente ao armazenamento.
- Jogos usam o ALE para decisões pedagógicas.
- Componentes visuais recebem dados e emitem eventos.
- Alterações arquiteturais exigem ADR.
