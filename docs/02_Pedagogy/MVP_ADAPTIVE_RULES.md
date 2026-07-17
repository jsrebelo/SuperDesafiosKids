# MVP_ADAPTIVE_RULES

## Objetivo

Criar uma primeira versão simples e previsível do Adaptive Learning Engine.

## Nível inicial

O nível inicial de cada competência é baseado na idade.

## Janela de desempenho

Usar as últimas 10 tentativas válidas por competência.

## Subir dificuldade

Subir um nível quando:

- pelo menos 8 respostas corretas;
- tempo médio dentro do intervalo esperado;
- no máximo 2 ajudas usadas.

## Manter dificuldade

Manter quando:

- entre 5 e 7 respostas corretas;
- não existem sinais claros de domínio ou dificuldade.

## Reduzir dificuldade

Reduzir quando:

- 4 ou menos respostas corretas;
- três tentativas consecutivas falhadas;
- tempo muito acima do esperado;
- utilização frequente de ajuda.

## Limites

- nunca subir mais de um nível de cada vez;
- nunca reduzir mais de um nível por decisão;
- respeitar mínimos e máximos da competência;
- não mostrar à criança que o nível diminuiu.

## Aleatoriedade

Toda a aleatoriedade deve poder ser controlada em testes.
