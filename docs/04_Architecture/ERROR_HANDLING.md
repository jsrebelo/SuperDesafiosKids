# ERROR_HANDLING

## Categorias

- ValidationError
- DomainError
- StorageError
- AssetError
- SyncError
- UnexpectedError

## Regras de experiência

### Criança

Apresentar mensagens simples e positivas:

- “Vamos tentar outra atividade.”
- “Tivemos um pequeno problema, mas o teu progresso está seguro.”

### Adulto

Apresentar informação útil:

- operação afetada;
- possibilidade de repetir;
- estado do progresso;
- código técnico opcional.

## Regras técnicas

- Não usar exceções para fluxos normais.
- Erros esperados usam resultados tipados.
- Erros inesperados são capturados por uma fronteira global.
- Nunca incluir nome da criança em logs externos.
