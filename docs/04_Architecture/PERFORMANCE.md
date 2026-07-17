# PERFORMANCE

## Objetivos iniciais

- arranque utilizável em até 3 segundos em dispositivos suportados;
- resposta visual ao toque em até 100 ms;
- transição entre exercícios sem bloqueios perceptíveis;
- geração de exercício em menos de 50 ms na maioria dos casos;
- suporte a dispositivos móveis de gama média.

## Estratégias

- carregamento progressivo de módulos;
- compressão de imagens;
- áudio em formatos adequados;
- evitar re-renderizações globais;
- limitar partículas e animações;
- descarregar cenas Phaser quando não utilizadas;
- cache local de assets.
