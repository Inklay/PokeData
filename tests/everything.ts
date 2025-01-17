import { testAllItems } from './item.ts'
import { testAllPokemon } from './pokemon.ts'
import { testAllAbilities } from './ability.ts'

export async function testEverything () {
  console.log('Testing all data...')
  const abilities = await testAllAbilities()
  const items = await testAllItems()
  await testAllPokemon(abilities, items)
  console.log('All tests passed !')
}
