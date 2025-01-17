import * as cheerio from 'cheerio'
import { wikis } from '../wiki.ts'
import { Name } from '../../class/name.ts'
import { getOtherNames } from '../utils.ts'
import { Ability } from '../../class/ability.ts'

export class AbilityFetcher extends Ability {
  private static URLList : string[] = []

  public static async getURLList () : Promise<string[]> {
    await this._getURLList()
    return this.URLList
  }

  private static async _getURLList () : Promise<void> {
    const URL = `${wikis.get('en')}Ability`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)

    $('#List_of_Abilities')
      .parent()
      .next('table')
      .children('tbody')
      .children('tr')
      .children('td')
      .children('table')
      .children('tbody')
      .children('tr')
      .each((_, element) => {
        let url = $('td:nth-child(2)', element).children('a').attr('href')
        if (url !== undefined) {
          this.URLList.push(url.replace('/wiki/', ''))
        }
      })
  }

  public static async get (abilityURL : string, id : number) : Promise<Ability> {
    const URL = `${wikis.get('en')}${abilityURL}`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)
    const names = getOtherNames($, false)
    const englishName = $('table.roundy > tbody > tr > td > big > b').text()
    names.push(new Name('en', englishName))

    return new Ability(id, names)
  }

  public static async getAll () : Promise<Ability[]> {
    await this._getURLList()
    console.log(`Getting data for ${this.URLList.length} abilities`)
    const data : Ability[] = []

    for (let i = 0; i < this.URLList.length; i++) {
      data.push(await this.get(this.URLList[i]!, i))
      if (i !== 0 && i % 100 === 0) {
        console.log(`Got data for ${i}/${this.URLList.length} abilities`)
      }
    }

    console.log('Got data for all abilities')
    return data
  }
}
