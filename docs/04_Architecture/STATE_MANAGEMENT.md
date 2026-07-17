# STATE_MANAGEMENT

## Estado global permitido

- perfil ativo;
- sessão ativa;
- preferências de interface;
- conectividade;
- notificações locais.

## Estado local

- seleção atual;
- animações;
- modais;
- estado temporário de formulários;
- progresso visual de uma cena.

## Regras

- Dados persistidos são obtidos através de casos de utilização.
- Zustand não substitui a base de dados.
- Não guardar objetos de domínio mutáveis no estado global.
- O estado de uma pergunta deve ser reiniciado ao mudar de exercício.
- O sistema deve impedir submissões duplicadas.
