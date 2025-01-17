import { isVisible } from '../utils.ts'
import type { Type } from '../../class/type.ts'

export class PokemonType {
  public types : Type[]
  public name : string

  private constructor (types : Type[], name : string) {
    this.types = types
    this.name = name
  }

  static get ($ : cheerio.Root, pokemonName : string) : PokemonType[] {
    const types : PokemonType[] = []
    $('table.roundy > tbody > tr > td.roundy > b > a[title=\'Type\']')
      .parent()
      .parent()
      .children('table.roundy')
      .children('tbody')
      .children('tr')
      .children('td').each((__, element) => {
        if (!isVisible($, element)) {
          return
        }
        // Get form name for those types
        let formName = $(element).children('small').text()
        const formTypes : Type[] = []
        $(element)
          .children('table')
          .children('tbody')
          .children('tr')
          .children('td').each((__, typeElement) => {
            if (!isVisible($, typeElement)) {
              return
            }
            formTypes.push($(typeElement).children('a').attr('title')!.replace(' (type)', '') as Type)
          })
        // If the pokemon has only one form, put default name
        if (formName === '') {
          formName = pokemonName
        }
        types.push(new PokemonType(formTypes, formName))
      })
    return types
  }
}
