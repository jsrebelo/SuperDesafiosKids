# WORD_DATABASE

## Campos

- id
- word
- normalizedWord
- syllables
- missingLetterCandidates
- ageMin
- ageMax
- difficulty
- category
- imageAssetId
- audioAssetId
- locale
- enabled

## Regras

- base inicial em português de Portugal;
- palavras concretas antes de abstratas;
- palavras curtas para idades mais baixas;
- evitar ambiguidades;
- suportar acentos;
- não remover diacríticos nas respostas;
- permitir listas de respostas equivalentes quando adequado.

## Exemplo

```json
{
  "id": "word_maca",
  "word": "maçã",
  "normalizedWord": "maca",
  "syllables": ["ma", "çã"],
  "ageMin": 5,
  "ageMax": 7,
  "difficulty": 1,
  "category": "food",
  "locale": "pt-PT"
}
```
