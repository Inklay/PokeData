import { load } from 'cheerio'
import { wikis } from '../../wiki.ts'
import { Category } from '../category.ts'
import { Name } from '../../../class/name.ts'
import { PokemonPokedexEntry } from '../pokedexEntry.ts'
import { TranslatedCategory } from './TranslatedCategory.ts'
import { ManualData } from '../manualData/manualData.ts'
import { TranslatedPokedexEntries } from './TranslatedPokedexEntries.ts'

export class TranslatedData {
  public category : TranslatedCategory[]
  public entries : TranslatedPokedexEntries[]

  private constructor () {
    this.category = []
    this.entries = []
  }

  public static async getTranslatedData (translatedNames : Name[], manualData : ManualData[], id : number) : Promise<TranslatedData> {
    const data = new TranslatedData
    // for (let i = 0; i < translatedNames.length; i++) {
    //   const URL = `${wikis.get(translatedNames[i]!.language)}${translatedNames[i]!.text}`
    //   if (URL === undefined) {
    //     continue
    //   }
    //   const pageHTML = await (await fetch(URL)).text()
    //   const $ = load(pageHTML)
    //   const newCategories = await TranslatedCategory.getTranslation($, translatedNames[i]!)
    //   Category.append(data.category, newCategories)

    //   const manualForm = manualData.find(data => data.id === id)
    //   const newPokedexEntries = await TranslatedPokedexEntries.getTranslation($, translatedNames[i]!, manualForm ? manualForm.forms : [])
    //   PokemonPokedexEntry.append(data.entries, newPokedexEntries)
    // }
    return data
  }
}
