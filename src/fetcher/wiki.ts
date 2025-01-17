import type { languageCode } from '../class/language.ts'

export const wikis : Map<languageCode, string> = new Map([
  ['en', 'https://bulbapedia.bulbagarden.net/wiki/'],
  ['de', 'https://www.pokewiki.de/'],
  ['fr', 'https://www.pokepedia.fr/'],
  ['es', 'https://www.wikidex.net/wiki/'],
  ['it', 'https://wiki.pokemoncentral.it/'],
  ['ja', 'https://wiki.ポケモン.com/wiki/'],
  ['zh-Hant', 'https://wiki.52poke.com/wiki/'],
  ['ko', 'https://pokemon.fandom.com/ko/wiki/']
])
