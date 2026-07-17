# GAME_CHOICE

## Estrutura

- pergunta;
- opções;
- estado da opção;
- botão de ajuda opcional;
- indicador de progresso.

## Estados da opção

- idle
- selected
- correct
- retry
- disabled

## Regras

- As opções devem manter posição após resposta.
- Não alterar a resposta selecionada antes de apresentar feedback.
- Evitar mais opções do que o necessário para a idade.
