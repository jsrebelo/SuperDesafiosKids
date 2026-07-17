# OFFLINE_FIRST

## Objetivo

Permitir que todas as funções essenciais operem sem Internet.

## Disponível offline

- criação e seleção de perfis;
- jogos incluídos na instalação;
- geração de exercícios;
- progresso;
- recompensas;
- estatísticas locais;
- área dos pais;
- definições.

## Estratégia

1. Assets essenciais são empacotados.
2. Exercícios são gerados localmente.
3. Dados são gravados num armazenamento local transacional.
4. A aplicação não bloqueia por ausência de rede.
5. Atualizações de conteúdo são opcionais e futuras.

## Falhas

- Uma falha de gravação deve ser mostrada ao adulto, não à criança.
- A tentativa deve permanecer em memória até ser possível repetir a gravação.
- Nunca apagar progresso existente durante uma migração falhada.
