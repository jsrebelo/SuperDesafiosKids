# SYSTEM_ARCHITECTURE

**Versão:** 0.5.0  
**Estado:** Draft  
**Âmbito:** MVP

## 1. Objetivo

Definir a arquitetura técnica do Super Desafios Kids de forma modular, testável, acessível e preparada para crescimento.

## 2. Princípios

1. O `Adaptive Learning Engine` é independente da interface.
2. Os jogos não implementam regras pedagógicas próprias.
3. O funcionamento principal não depende de Internet.
4. A lógica de negócio não depende de React, Phaser ou armazenamento.
5. Cada módulo expõe contratos claros.
6. O progresso é persistido após cada resposta válida.
7. A sincronização cloud é opcional e futura.

## 3. Camadas

### Presentation

Responsável por:

- ecrãs;
- navegação;
- componentes visuais;
- animações;
- feedback sonoro e visual;
- acessibilidade.

Não contém regras pedagógicas.

### Application

Coordena casos de utilização:

- criar perfil;
- iniciar sessão;
- gerar exercício;
- submeter resposta;
- atribuir recompensa;
- consultar estatísticas.

### Domain

Contém as regras centrais:

- competências;
- exercícios;
- sessões;
- progressão;
- recompensas;
- perfis;
- Adaptive Learning Engine.

Não depende de frameworks.

### Infrastructure

Implementa:

- armazenamento local;
- áudio;
- relógio;
- geração de identificadores;
- exportação;
- sincronização futura;
- telemetria autorizada.

## 4. Fluxo de uma resposta

1. A criança seleciona uma resposta.
2. A interface envia a tentativa ao caso de utilização.
3. O domínio valida a resposta.
4. O ALE atualiza o nível da competência.
5. O sistema de recompensas calcula XP e moedas.
6. O progresso é guardado localmente.
7. A interface apresenta feedback positivo.
8. O ALE seleciona o próximo exercício.

## 5. Limites arquiteturais

- Um jogo pode pedir exercícios ao ALE.
- Um jogo não pode alterar diretamente o nível pedagógico.
- Componentes visuais não acedem diretamente à base de dados.
- Serviços de infraestrutura implementam interfaces definidas nas camadas internas.
- Dados pessoais da criança não são enviados para serviços externos por defeito.

## 6. Módulos principais

- Profiles
- Learning
- Exercises
- Games
- Sessions
- Rewards
- Statistics
- Parents
- Settings
- Accessibility
- Localization
- Storage
- Sync

## 7. Critérios de aceitação

- A lógica do ALE pode ser testada sem navegador.
- A aplicação funciona offline após instalação.
- Um novo jogo pode ser adicionado sem alterar o núcleo do ALE.
- A persistência pode ser substituída sem alterar o domínio.
- Nenhum componente React contém regras de progressão pedagógica.
