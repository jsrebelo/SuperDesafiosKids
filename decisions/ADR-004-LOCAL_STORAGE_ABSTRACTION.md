# ADR-004 — Abstração de armazenamento

## Estado

Aceite.

## Decisão

O domínio e os casos de utilização dependem de interfaces de repositório, não de IndexedDB ou SQLite diretamente.

## Consequências

- Permite Web e aplicações nativas.
- Simplifica testes.
- Exige adaptadores por plataforma.
