import fs from 'fs'
import { Item } from '../src/class/item.ts'
import { ItemFetcher } from '../src/fetcher/item/item.ts'

export async function testAllItems () : Promise<Item[]> {
  console.log('Trying to gather data for all items')
  const itemURLList = await ItemFetcher.getURLList()
  const items = []
  for (let i = 0; i < itemURLList.length; i++) {
    const data = await ItemFetcher.get(itemURLList[i]!, i)
    items[i] = data
    console.assert(data !== undefined)
    // Name
    console.assert(data.names !== undefined, `${itemURLList[i]}: Names undefined`)
    console.assert(data.names.length !== 0, `${itemURLList[i]}: Names empty`)
    console.assert(data.names[0]!.text !== '', `${itemURLList[i]}: Name empty`)
    console.assert(data.names[0]!.text !== undefined, `${itemURLList[i]}: No english name`)
    // Id
    console.assert(data.id !== undefined, `${itemURLList[i]}: Id undefined`)
    console.assert(data.id >= 0, `${itemURLList[i]}: Id invalid -> ${data.id}`)
  }
  console.log('Successfully gathered the data for all items !')
  fs.writeFileSync('cache/items.json', JSON.stringify(items))
  return items
}
