import { load } from 'cheerio'

import { createAlolanNames, createGalarianNames, createGigantamaxNames, createHisuianNames, createMegaNames, createPaldeanNames, createUnownNames } from '../pokemon/translation/getTranslatedFormNames.js'
import fs from 'fs'
import { getTranslatedData } from '../pokemon/translation/getTranslatedData.js'
import { getCategory } from '../pokemon/getCategories.js'
import { getFetch } from './cached_fetch.js'
import { getPokedexEntries } from '../pokemon/getFlavorText.js'

function getEggGroupsNumber (eggGroup) {
  switch (eggGroup) {
    case 'Monster':
      return 1
    case 'Water 1':
      return 2
    case 'Water 2':
      return 3
    case 'Water 3':
      return 4
    case 'Bug':
      return 5
    case 'Flying':
      return 6
    case 'Fairy':
      return 7
    case 'Grass':
      return 8
    case 'Human_Like':
      return 9
    case 'Mineral':
      return 10
    case 'Amorphous':
      return 11
    case 'Dragon':
      return 12
    case 'Ditto':
      return 13
    case 'No Eggs Discovered':
      return 14
    case 'Field':
      return 15
    default:
      return -1
  }
}

function fixRandomStuff (pokemon, stats) {
  // Some Pikachu forms have a different egg group
  if (pokemon.dex_numbers.nat === 25) {
    if (pokemon.form_type === 'other') {
      pokemon.egg_groups = [14]
    } else {
      pokemon.egg_groups = [15, 7]
    }
  } else if (pokemon.dex_numbers.nat === 128) {
    if (pokemon.form_type === 'paldea') {
      pokemon.stats = stats[1].stats
    }
  } else if (pokemon.dex_numbers.nat === 774) {
    if (pokemon.form_type === 'other') {
      pokemon.stats = stats[1].stats
    }
  }
  return pokemon
}
