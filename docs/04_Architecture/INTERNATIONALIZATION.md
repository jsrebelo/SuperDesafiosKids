# INTERNATIONALIZATION

## Idioma inicial

Português de Portugal (`pt-PT`).

## Regras

- nenhum texto visível fica diretamente no componente;
- usar chaves semânticas;
- exercícios linguísticos são separados por variante linguística;
- áudio e texto devem usar a mesma variante;
- formatos de data e número usam APIs de internacionalização.

## Estrutura sugerida

```text
localization/
├── pt-PT/
│   ├── common.json
│   ├── games.json
│   └── parents.json
└── index.ts
```
