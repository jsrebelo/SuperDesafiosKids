# TECH_STACK

**Versão:** 0.5.0

## Stack recomendada para o MVP

### Aplicação

- React
- TypeScript em modo `strict`
- Vite
- React Router
- Zustand para estado de interface e sessão
- Phaser 3 apenas para minijogos que necessitem de canvas, física ou cenas

### Persistência

- IndexedDB na versão Web/PWA
- Camada de repositório abstrata
- SQLite quando a aplicação for empacotada nativamente

### Testes

- Vitest
- React Testing Library
- Playwright

### Qualidade

- ESLint
- Prettier
- TypeScript
- Husky opcional
- Conventional Commits

### Distribuição

- PWA para a primeira versão
- Capacitor para Android e iOS numa fase posterior

## Regras

- Phaser não deve controlar a navegação global.
- React é responsável pela aplicação, menus e área dos pais.
- O domínio não importa bibliotecas de interface.
- Bibliotecas adicionais exigem registo em ADR.
