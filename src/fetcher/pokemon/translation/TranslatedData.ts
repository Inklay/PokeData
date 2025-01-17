import { load } from 'cheerio'
import { wikis } from '../../wiki.ts'
import { Name } from '../../../class/name.ts'
import { TranslatedCategory } from './TranslatedCategory.ts'
import { ManualData } from '../../pokemon/manual_data/manual_data.ts'
// import { getTranslatedPokedexEntries } from './getTranslatedPokedexEntries.ts'

export class TranslatedData {
  public category : TranslatedCategory[]
  // public flavor_text: []

  private constructor () {
    this.category = []
    // this.flavor_text = []
  }

  public static async getTranslatedData (translatedNames : Name[], manualData : ManualData[], id : number) : Promise<TranslatedData> {
    const data = new TranslatedData
    for (let i = 0; i < translatedNames.length; i++) {
      const URL = `${wikis.get(translatedNames[i]!.language)}${translatedNames[i]!.text}`
      if (URL === undefined) {
        continue
      }
      const pageHTML = await (await fetch(URL)).text()
      const $ = load(pageHTML)
      let newData = await TranslatedCategory.getTranslation($, translatedNames[i]!)
      newData.forEach(category => {
        const alreadyExisting = data.category.find(x => x.form === category.form)
        if (alreadyExisting !== undefined) {
          alreadyExisting.categories = [
            ...alreadyExisting.categories,
            ...category.categories
          ]
        } else {
          data.category.push(category)
        }
      })
      // const manualForm = manualData.find(data => data.id === id)
      // if (manualForm !== undefined) {
      //   data.flavor_text = [
      //     ...data.flavor_text,
      //     ...await getTranslatedPokedexEntries($, translatedNames[i], manualForm.forms)
      //   ]
      // }
    }
    return data
  }
}
