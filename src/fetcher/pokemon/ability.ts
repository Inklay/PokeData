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

  private static findId (abilities : Ability[], text : string) : number {
    const ability = abilities.find(ability => {
      let name = ability.names.find(name => name.language === 'en')
      if (name === undefined) {
        return false
      }
      return name.text === text
    })
    if (ability === undefined) {
      return -1
    }
    return ability.id
  }

  public static get ($ : cheerio.Root, abilities : Ability[], baseName : string) : PokemonFetcherAbility[] {
    const data : PokemonFetcherAbility[] = []
    const tbody = $('td.roundy > b > a[href=\'/wiki/Ability\']')
      .parent()
      .next('table')
      .children('tbody')
    if ($(tbody).children('tr').length === 1) {
      $(tbody)
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
            const id = this.findId(abilities, $(link).text())
            data.push(new PokemonFetcherAbility(form, new PokemonAbility(id, isHidden)))
          })
        })
    } else {
      $(tbody).children('tr').each((_, tr) => {
        $(tr).children('td').each((__, td) => {
          if (!isVisible($, td)) {
            return
          }
          let element = $(td).children().first()
          let names : string[] = []
          while ($(element).length > 0) {
            if ($(element).is('a')) {
              names.push($(element).text())
            } else if ($(element).is('small')) {
              let text = $(element).text().replace('(', '').replace(')', '')
              let isHidden = false

              if (text.search('Hidden Ability') !== -1) {
                isHidden = true
                text = text.replace('Hidden Ability', '')
              }

              text.split(' and ').forEach(form => {
                if (form === baseName) {
                  form = 'default'
                }
                names.forEach(abilityName => {
                  const id = this.findId(abilities, abilityName)
                  data.push(new PokemonFetcherAbility(form.trim(), new PokemonAbility(id, isHidden)))
                })
              })
              names = []
            }
            element = $(element).next()
          }
        })
      })
    }
    return data
  }
}
