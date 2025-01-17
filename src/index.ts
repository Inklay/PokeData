import fs from 'fs'
import { DataPackage } from './class/dataPackage.ts'
import { ItemFetcher } from './fetcher/item/item.ts'
import { PokemonFetcher } from './fetcher/pokemon/pokemon.ts'
import { AbilityFetcher } from './fetcher/ability/ability.ts'

async function startGathering () {
  const abilities = await AbilityFetcher.getAll()
  const items = await ItemFetcher.getAll()
  const pokemon = await PokemonFetcher.getAll(abilities, items)
  const data = new DataPackage(abilities, items, pokemon)

  fs.writeFileSync('data.json', JSON.stringify(data))
}

startGathering().then(() => {
  console.log('Data fetched successfully!')
})
