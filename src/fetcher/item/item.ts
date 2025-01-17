import * as cheerio from 'cheerio'
import { wikis } from '../wiki.ts'
import { Item } from '../../class/item.ts'
import { Name } from '../../class/name.ts'
import { getOtherNames } from '../utils.ts'

export class ItemFetcher extends Item {
  private static URLList : string[] = []

  public static async getURLList () : Promise<string[]> {
    await this._getURLList()
    return this.URLList
  }

  private static async _getURLList () : Promise<void> {
    const URL = `${wikis.get('en')}List_of_items_by_name`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)
    let elem = $('#List_of_items_by_name').parent()
    while ($(elem).length > 0) {
      if (($(elem)[0] as cheerio.TagElement).name === 'table') {
        $(elem).children('tbody').children('tr').each((index, row) => {
          // Skip the first row, which is the table header
          if (index === 0) {
            return
          }
          // Skip the last row, which is empty
          if ($(row).children('td').length === 0) {
            return
          }
          const url = $('tr td:nth-child(2) a', row).attr('href')
          if (url !== undefined) {
            this.URLList.push(url.replace('/wiki/', ''))
          }
        })
      }
      elem = $(elem).next()
    }
  }

  public static async get (itemURL : string, id : number) : Promise<Item> {
    const URL = `${wikis.get('en')}${itemURL}`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)
    const names = getOtherNames($, false)
    const englishName = $('#firstHeading').text()
    names.push(new Name('en', englishName))

    return new Item(id, names)
  }

  public static async getAll () : Promise<Item[]> {
    await this._getURLList()
    console.log(`Getting data for ${this.URLList.length} items`)
    const data : Item[] = []

    for (let i = 0; i < this.URLList.length; i++) {
      data.push(await this.get(this.URLList[i]!, i))
      if (i !== 0 && i % 100 === 0) {
        console.log(`Got data for ${i}/${this.URLList.length} items`)
      }
    }

    console.log('Got data for all items')
    return data
  }
}
