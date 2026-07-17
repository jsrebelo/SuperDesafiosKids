# TEST_STRATEGY

**Versão:** 0.9.0

## Objetivo

Garantir qualidade funcional, pedagógica, técnica e de experiência antes de cada release.

## Níveis de teste

### Unitários

Cobrem:

- Adaptive Learning Engine;
- geradores;
- progressão;
- recompensas;
- validações;
- transformações de dados.

### Integração

Cobrem:

- casos de utilização;
- armazenamento;
- migrações;
- sessões;
- estatísticas;
- integração React com application layer.

### Interface

Cobrem:

- componentes;
- estados;
- acessibilidade;
- mensagens;
- navegação;
- responsividade.

### End-to-end

Cobrem:

- criação de perfil;
- início de sessão;
- resolução de exercícios;
- persistência;
- recompensas;
- área dos pais;
- funcionamento offline.

## Regra

Toda a funcionalidade crítica deve possuir pelo menos um teste automatizado e um cenário manual documentado.
