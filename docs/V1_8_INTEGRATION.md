# Integração da v1.8

## Passos

1. Copiar os ficheiros por cima da versão v1.7.
2. Substituir gradualmente os repositórios `Browser*` pelos novos repositórios `IndexedDb*` no ponto de composição da aplicação.
3. Garantir que `bootstrapStorage()` é executado antes de renderizar a aplicação.
4. Instanciar `ExportProfileData` e adicionar `ParentExportSection` ao painel dos pais.
5. Usar `SessionTracker` ao entrar num jogo e `FinishTrackedSession` ao sair ou terminar sessão.
6. Executar:

```bash
npm run typecheck
npm test
npm run dev
```

## Migração

A migração lê os dados existentes em `localStorage`, copia-os para IndexedDB e regista a conclusão. Os dados antigos não são apagados nesta versão, permitindo recuperação manual.

## Recomendação

Depois de validar a migração em vários dispositivos, uma versão futura poderá limpar os dados antigos de forma segura.

## Próxima versão

A v1.9 deverá introduzir:

- recuperação e importação de dados exportados;
- gestão de versões de esquema;
- transações multi-store;
- relatórios em PDF;
- testes end-to-end completos;
- preparação para release candidate.
