# DESIGN TOKENS

## Categorias

- color
- typography
- spacing
- radius
- shadow
- motion
- zIndex
- breakpoints

## Exemplo

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;
```

## Regra

Componentes não devem usar valores visuais arbitrários quando existir token correspondente.
