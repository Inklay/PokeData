import { isVisible } from '../utils.ts'
import { Ability } from '../../class/ability.ts'
import { PokemonAbility } from '../../class/pokemonAbility.ts'

export class PokemonFetcherAbility {
  public form : string
  public ability : PokemonAbility

  private constructor (form : string, ability : PokemonAbility) {
    this.form = form
    this.ability = ability
  }

  public static get ($ : cheerio.Root, abilities : Ability[]) : PokemonFetcherAbility[] {
    const data : PokemonFetcherAbility[] = []
    $('td.roundy > b > a[href=\'/wiki/Ability\']')
      .parent()
      .next('table')
      .children('tbody')
      .children('tr')
      .children('td')
      .each((__, element) => {
        if (!isVisible($, element)) {
          return
        }
        let isHidden = false
        let form = 'default'
        if ($(element).children('small').length > 0) {
          const text = $(element).children('small').text()
          if (text === ' Hidden Ability') {
            isHidden = true
          } else {
            form = text
          }
        }
        $(element).children('a').each((__, link) => {
          const ability = abilities.find(ability => {
            let name = ability.names.find(name => name.language === 'en')
            if (name === undefined) {
              return false
            }
            return name.text === $(link).text()
          })
          if (ability === undefined) {
            return [{
              ability: -1,
              is_hidden: false,
              form: 'default'
            }]
          }
          data.push(new PokemonFetcherAbility(form, new PokemonAbility(ability.id, isHidden)))
        })
      })
    return data
  }
}
