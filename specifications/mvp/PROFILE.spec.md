# PROFILE.spec

## Objetivo

Permitir múltiplos perfis infantis no mesmo dispositivo.

## Dados

- id;
- displayName;
- age;
- avatarId;
- createdAt;
- updatedAt;
- active;
- archivedAt opcional.

## Regras

- nome entre 1 e 20 caracteres;
- não exigir apelido;
- idade entre 5 e 10;
- avatar obrigatório;
- perfil arquivado não aparece na seleção normal;
- apenas um perfil ativo de cada vez.

## Fluxo principal

1. Adulto ou criança abre seleção.
2. Escolhe “Novo perfil”.
3. Introduz nome curto.
4. Seleciona idade.
5. Seleciona avatar.
6. Confirma.
7. Perfil é guardado.
8. Perfil torna-se ativo.

## Casos limite

- nome duplicado é permitido;
- falha de armazenamento não pode criar perfil parcial;
- edição de idade não apaga progresso;
- arquivar exige confirmação na área dos pais.

## Critérios de aceitação

- [ ] Perfil persiste após reinício.
- [ ] Perfil pode ser selecionado.
- [ ] Apenas um perfil fica ativo.
- [ ] Idade inválida é rejeitada.
- [ ] Funciona offline.
- [ ] Testes unitários e integração existem.
