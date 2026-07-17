# Integração da v1.9

## Passos

1. Copiar os ficheiros por cima da versão v1.8.
2. Substituir a abertura direta da base de dados por `openMigratedDatabase()`.
3. Instanciar `ImportProfileData`.
4. Adicionar `ParentImportSection` à área dos pais.
5. Adicionar `ParentReportSection` ao painel dos pais.
6. Executar:

```bash
npm run typecheck
npm test
npm run build
```

## Importação

A importação aceita apenas ficheiros JSON com `schemaVersion: 1`.

## Relatório PDF

O relatório é aberto numa nova janela em HTML. O adulto pode escolher “Imprimir” e guardar como PDF através do navegador.

## Próxima versão

A próxima etapa deverá ser a `v2.0.0-rc.1`, com:

- aplicação consolidada;
- testes end-to-end completos;
- correções de integração;
- assets visuais iniciais;
- áudio básico;
- build PWA final;
- revisão de acessibilidade;
- release candidate.
