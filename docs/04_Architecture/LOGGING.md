# LOGGING

## Objetivo

Apoiar diagnóstico sem comprometer privacidade.

## Eventos locais permitidos

- arranque da aplicação;
- migração de armazenamento;
- início e fim de sessão;
- erro técnico;
- carregamento de assets.

## Proibido

- guardar respostas textuais livres de crianças;
- guardar nomes em logs;
- enviar telemetria sem consentimento;
- registar dados sensíveis.

## Níveis

- debug
- info
- warn
- error

Em produção, `debug` fica desativado.
