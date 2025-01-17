import fs from 'fs'
import type { Ability } from '../src/class/ability.ts'
import { AbilityFetcher } from '../src/fetcher/ability/ability.ts'

export async function testAllAbilities () : Promise<Ability[]> {
  console.log('Trying to gather data for all abilities')
  const abilityURLList = await AbilityFetcher.getURLList()
  const abilities = []
  for (let i = 0; i < abilityURLList.length; i++) {
    const data = await AbilityFetcher.get(abilityURLList[i]!, i)
    abilities[i] = data
    console.assert(data !== undefined)
    // Name
    console.assert(data.names !== undefined, `${abilityURLList[i]}: Names undefined`)
    console.assert(data.names.length !== 0, `${abilityURLList[i]}: Names empty`)
    console.assert(data.names[0]!.text !== '', `${abilityURLList[i]}: Name empty`)
    console.assert(data.names[0]!.text !== undefined, `${abilityURLList[i]}: No english name`)
    // Id
    console.assert(data.id !== undefined, `${abilityURLList[i]}: Id undefined`)
    console.assert(data.id >= 0, `${abilityURLList[i]}: Id invalid -> ${data.id}`)
  }
  console.log('Successfully gathered the data for all abilities !')
  fs.writeFileSync('cache/abilities.json', JSON.stringify(abilities))
  return abilities
}
