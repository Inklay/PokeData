import { load } from 'cheerio'
import { wikis } from '../../wiki.ts'
import { Name } from '../../../class/name.ts'
import { TranslatedCategory } from './TranslatedCategory.ts'
import { ManualData } from '../../pokemon/manual_data/manual_data.ts'
import { TranslatedPokedexEntries } from './TranslatedPokedexEntries.ts'
import { Category } from '../category.ts'

export class TranslatedData {
  public category : TranslatedCategory[]
  public flavor_text : TranslatedPokedexEntries[]

  private constructor () {
    this.category = []
    this.flavor_text = []
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
    //   newPokedexEntries.forEach(entry => {
    //     const alreadyExisting = data.flavor_text.find(x => x.form === entry.form)
    //     if (alreadyExisting !== undefined) {
    //       alreadyExisting.entries = [
    //         ...alreadyExisting.entries,
    //         ...entry.entries
    //       ]
    //     } else {
    //       data.flavor_text.push(entry)
    //     }
    //   })
    // }
    return data
  }
}
