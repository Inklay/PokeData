import fs from 'fs'
import { testAllItems } from './item.ts'
import { testAllPokemon } from './pokemon.ts'
import { testAllAbilities } from './ability.ts'
import { testEverything } from './everything.ts'

if (!fs.existsSync('./cache')) {
  fs.mkdirSync('./cache')
}

switch (process.argv[2]) {
  case 'items':
    await testAllItems()
    break
  case 'abilities':
    await testAllAbilities()
    break
  case 'pokemon':
    await testAllPokemon()
    break
  default:
    await testEverything()
}
