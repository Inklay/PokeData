import fs from 'fs'
import { testAllItems } from './item.ts'
import { Item } from '../src/class/item.ts'
import { testAllAbilities } from './ability.ts'
import { Ability } from '../src/class/ability.ts'
import { PokemonFetcher} from '../src/fetcher/pokemon/pokemon.ts'

export async function testAllPokemon (abilities: undefined | Ability[] = undefined, items: undefined | Item[] = undefined) {
  if (abilities === undefined) {
    if (fs.existsSync('cache/abilities.json')) {
      console.log('Using already stored abilities')
      abilities = JSON.parse(fs.readFileSync('cache/abilities.json').toString())
    } else {
      console.log('Fetching abilities...')
      abilities = await testAllAbilities()
      fs.writeFileSync('cache/abilities.json', JSON.stringify(abilities))
    }
    if (items === undefined) {
      if (fs.existsSync('cache/items.json')) {
        console.log('Using already stored items')
        items = JSON.parse(fs.readFileSync('cache/items.json').toString())
      } else {
        console.log('Fetching items...')
        items = await testAllItems()
        fs.writeFileSync('cache/items.json', JSON.stringify(items))
      }
    }
  }

  console.log('Trying to gather data for all Pokémon')
  const pokemonURLList = await PokemonFetcher.getURLList()
  let start = 0
  let end = pokemonURLList.length
  if (process.argv[3] !== undefined) {
    start = parseInt(process.argv[3]) - 1
    if (process.argv[4] !== undefined) {
      end = parseInt(process.argv[4])
    } else {
      end = parseInt(process.argv[3])
    }
  }
  for (let i = start; i < end; i++) {
    const data = await PokemonFetcher.get(pokemonURLList[i]!, abilities!, items!)
    fs.writeFileSync('./tests/result.json', JSON.stringify(data))
    console.assert(data !== undefined)
    console.assert(data.length > 0)
    for (let j = 0; j < data.length; j++) {
      // Name
      console.assert(data[j]!.names !== undefined, `${pokemonURLList[i]}, form ${j}: Names undefined`)
      console.assert(data[j]!.names.length !== 0, `${pokemonURLList[i]}, form ${j}: Names empty`)
      console.assert(data[j]!.names.find(name => name.language === 'en') !== undefined, `${pokemonURLList[i]}, form ${j}: No english name`)
      console.assert(data[j]!.names.find(name => name.language === 'en')!.text !== '', `${pokemonURLList[i]}, form ${j}: English name empty`)
      // console.assert(data[j]!.names.find(name => name.language === 'fr') !== undefined, `${data[j]!.names[0]!.text}, form ${j}: No french name`)
      // console.assert(data[j]!.names.find(name => name.language === 'es') !== undefined, `${data[j]!.names[0]!.text}, form ${j}: No spanish name`)
      // console.assert(data[j]!.names.find(name => name.language === 'de') !== undefined, `${data[j]!.names[0]!.text}, form ${j}: No german name`)
      // console.assert(data[j]!.names.find(name => name.language === 'ja') !== undefined, `${data[j]!.names[0]!.text}, form ${j}: No japanese name`)
      // console.assert(data[j]!.names.find(name => name.language === 'ko') !== undefined, `${data[j]!.names[0]!.text}, form ${j}: No korean name`)
      // console.assert(data[j]!.names.find(name => name.language === 'zh-Hant') !== undefined, `${data[j]!.names[0]!.text}, form ${j}: No chinese name`)
      // Dex numbers
      console.assert(data[j]!.dexNumbers !== undefined, `${data[j]!.names[0]!.text}: Dex numbers undefined`)
      console.assert(data[j]!.dexNumbers.nat !== undefined, `${data[j]!.names[0]!.text}: Nat dex numbers undefined`)
      console.assert(data[j]!.dexNumbers.nat >= -1, `${data[j]!.names[0]!.text}: Nat dex numbers invalid -> ${data[j]!.dexNumbers.nat}`)
      // Types
      console.assert(data[j]!.types !== undefined, `${data[j]!.names[0]!.text}: Types undefined`)
      console.assert(data[j]!.types.length !== 0, `${data[j]!.names[0]!.text}: Types empty`)
      console.assert(data[j]!.types[0] !== undefined, `${data[j]!.names[0]!.text}: First type undefined -> ${data[j]!.types[0]}`)
      // Base friendship
      console.assert(data[j]!.baseFriendship !== undefined, `${data[j]!.names[0]!.text}: Base friendship undefined`)
      console.assert(data[j]!.baseFriendship >= -1, `${data[j]!.names[0]!.text}: Base friendship invalid -> ${data[j]!.baseFriendship}`)
      // Catch rate
      console.assert(data[j]!.catchRate !== undefined, `${data[j]!.names[0]!.text}: Catch rate undefined`)
      console.assert(data[j]!.catchRate >= -1, `${data[j]!.names[0]!.text}: Catch rate invalid -> ${data[j]!.catchRate}`)
      // Height
      console.assert(data[j]!.height !== undefined, `${data[j]!.names[0]!.text}: Height undefined`)
      console.assert(data[j]!.height > 0, `${data[j]!.names[0]!.text}: Height invalid -> ${data[j]!.height}`)
      // Weight
      console.assert(data[j]!.weight !== undefined, `${data[j]!.names[0]!.text}: Weight undefined`)
      console.assert(data[j]!.weight >= -1, `${data[j]!.names[0]!.text}: Weight invalid -> ${data[j]!.weight}`)
      // Egg groups
      console.assert(data[j]!.eggGroups !== undefined, `${data[j]!.names[0]!.text}: Egg groups undefined`)
      console.assert(data[j]!.eggGroups.length !== 0, `${data[j]!.names[0]!.text}: Egg groups empty`)
      console.assert(data[j]!.eggGroups[0] !== undefined, `${data[j]!.names[0]!.text}: First egg group undefined -> ${data[j]!.eggGroups[0]}`)
      // Gender ratio
      console.assert(data[j]!.genderRate !== undefined, `${data[j]!.names[0]!.text}: Gender ratio undefined`)
      console.assert(data[j]!.genderRate >= -1, `${data[j]!.names[0]!.text}: Gender ratio invalid -> ${data[j]!.genderRate}`)
      console.assert(data[j]!.genderRate <= 10, `${data[j]!.names[0]!.text}: Gender ratio invalid -> ${data[j]!.genderRate}`)
      // Growth rate
      console.assert(data[j]!.growthRate !== undefined, `${data[j]!.names[0]!.text}: Growth rate undefined`)
      console.assert(data[j]!.growthRate !== '', `${data[j]!.names[0]!.text}: Growth rate empty`)
      // Cateory
      console.assert(data[j]!.category !== undefined, `${data[j]!.names[0]!.text}: Category undefined`)
      console.assert(data[j]!.category.length !== 0, `${data[j]!.names[0]!.text}: Category empty`)
      console.assert(data[j]!.category[0]!.text !== undefined, `${data[j]!.names[0]!.text}: English category undefined`)
      console.assert(data[j]!.category[0]!.text !== '', `${data[j]!.names[0]!.text}: English category empty`)
      // Flavor text
      console.assert(data[j]!.pokedexEntries !== undefined, `${data[j]!.names[0]!.text}: Flavor text undefined`)
      console.assert(data[j]!.pokedexEntries.length !== 0, `${data[j]!.names[0]!.text}: Flavor text empty`)
      // Stats
      console.assert(data[j]!.stats !== undefined, `${data[j]!.names[0]!.text}: Stats undefined`)
      console.assert(data[j]!.stats.length >= 5, `${data[j]!.names[0]!.text}: Stats invalid -> ${data[j]!.stats}`)
      // Abilities
      console.assert(data[j]!.abilities !== undefined, `${data[j]!.names[0]!.text}: Abilities undefined`)
      console.assert(data[j]!.abilities.length > 0, `${data[j]!.names[0]!.text}: Abilities empty`)
      // Form type
      console.assert(data[j]!.formType !== undefined, `${data[j]!.names[0]!.text}: Form type undefined`)
      console.assert(data[j]!.formType.length > 0, `${data[j]!.names[0]!.text}: Form type empty`)
      // Form name
      console.assert(data[j]!.formType !== undefined, `${data[j]!.names[0]!.text}: Form name undefined`)
      console.assert(data[j]!.formType.length > 0, `${data[j]!.names[0]!.text}: Form name empty`)
      // Sprites
      console.assert(data[j]!.sprites !== undefined, `${data[j]!.names[0]!.text}: Sprites undefined`)
      console.assert(data[j]!.sprites.length > 0, `${data[j]!.names[0]!.text}: Sprites empty`)
      console.assert(data[j]!.sprites[0]!.url !== undefined, `${data[j]!.names[0]!.text}: Sprite url undefined empty`)
      console.assert(data[j]!.sprites[0]!.url.length > 0, `${data[j]!.names[0]!.text}: Sprites url empty`)
      console.assert(data[j]!.sprites[0]!.name !== undefined, `${data[j]!.names[0]!.text}: Sprite name undefined empty`)
      console.assert(data[j]!.sprites[0]!.name.length > 0, `${data[j]!.names[0]!.text}: Sprites name empty`)
    }
  }
  console.log('Successfully gathered the data for all Pokémon !')
}
