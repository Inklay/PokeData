import { isVisible } from '../../utils.ts'
import { ManualForm } from './manualForm.ts'
import { Name } from '../../../class/name.ts'
import { Sprite } from '../../../class/sprite.ts'
import { Pokemon } from '../../../class/pokemon.ts'
import type { PokemonFormType } from '../../../class/pokemonForm.ts'

export class PokemonForm extends Pokemon {
  private constructor (names : Name[], form_type : PokemonFormType, form_name : string, sprites : Sprite[]) {
    super()
    this.names = names
    this.formType = form_type
    this.formName = form_name
    this.sprites = sprites
  }

  public static add (forms : PokemonForm[], fullName : string, spriteURL : string | undefined, formType : PokemonFormType, baseName : string, isDefault : boolean, formName : string | undefined) {
    fullName = fullName.replaceAll(String.fromCharCode(160), ' ')
    if (formName === undefined) {
      formName = fullName
    }
    if (isDefault) {
      formType = 'default'
      fullName = baseName
    }
    if (!fullName.includes(baseName)) {
      fullName = `${baseName} ${fullName}`
    }
    if (spriteURL !== undefined) {
      spriteURL = spriteURL.replace('/thumb', '')
      spriteURL = spriteURL.slice(0, spriteURL.search('.png') + 4)
    }
    const sprite = new Sprite('artwork', `https:${spriteURL}`, undefined)
    const name = new Name('en', fullName.trim())
    const form = new PokemonForm([name], formType, formName, [sprite])
    forms.push(form)
  }

  public static get ($ : cheerio.Root) : PokemonForm[] {
    let forms : PokemonForm[] = []
    const baseName = $('td > a[href=\'/wiki/Pok%C3%A9mon_category\']')
      .parent()
      .children('big')
      .children('big')
      .children('b')
      .text()

    $('table.roundy > tbody > tr > td > table > tbody > tr > td > big')
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .next()
      .children('td')
      .children('table')
      .children('tbody')
      .children('tr').each((index, element) => {
        // Index 3 is just a link to the Bulbagarden archive
        if (index === 3) {
          return
        }
        if (!isVisible($, element)) {
          return
        }
        $(element).children('td').each((__, formElement) => {
          if (!isVisible($, formElement)) {
            return
          }
          const spriteURL = $(formElement).children('a').children('img').attr('src')
          // Get form name for filtering
          let fullName = $(formElement).children('small').text()
          if (fullName === '' || fullName === 'Ultimate Mode' || fullName === 'Apex Build' || fullName === 'Full Belly Mode') {
            fullName = baseName
          }
          const lowerCaseName = fullName.toLowerCase()
          let formType : PokemonFormType = 'other'

          if (lowerCaseName.includes('mega')) {
            formType = 'mega'
          } else if (lowerCaseName.includes('gigantamax')) {
            formType = 'gmax'
          } else if (lowerCaseName.includes('alola')) {
            formType = 'alola'
          } else if (lowerCaseName.includes('galar')) {
            formType = 'galar'
          } else if (lowerCaseName.includes('hisui')) {
            formType = 'hisui'
          } else if (lowerCaseName.includes('paldea')) {
            formType = 'paldea'
          } else if (index === 0) {
            formType = 'default'
          }
          forms = [...forms, ...this.addManually($, fullName, spriteURL, formType, baseName)]
        })
      })
    return forms
  }

  private static addCosplayPikachu ($ : cheerio.Root, tableId: string, forms : PokemonForm[], formType : PokemonFormType, baseName : string, fullName : string) {
    $(`span#${tableId}`)
    .parent()
    .next('p')
    .next('table')
    .next('p')
    .next('p')
    .next('div')
    .children('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .each((index, element) => {
      let spriteURL : string
      if (index % 2 !== 0) {
        return
      }
      if (index === 0) {
        return
      }
      $(element)
        .children('table')
        .children('tbody')
        .children('tr')
        .each((rowIndex, row) => {
          if (rowIndex === 1) {
            spriteURL = $(row).children('td').children('a').children('img').attr('src')!
          } else if (rowIndex === 2) {
            this.add(forms, $(row).children('td').children('small').text(), spriteURL, formType, baseName, false, fullName)
          }
        })
    })
  }

  private static addManually ($ : cheerio.Root, fullName : string, spriteURL : string | undefined, formType : PokemonFormType, baseName : string) : PokemonForm[] {
    const forms : PokemonForm[] = []
    const formInfo = ManualForm.getInfo(fullName)
    if (formInfo.tableId === '') {
      this.add(forms, fullName, spriteURL, formType, baseName, formType === 'default', undefined)
      return forms
    }
    if (formInfo.isCosplayPikachu) {
      this.addCosplayPikachu($, formInfo.tableId, forms, formType, baseName, fullName)
      return forms
    }
    let table = $(`span#${formInfo.tableId}`).parent()
    const names : string[] = []
    while (($(table)[0] as cheerio.TagElement).name !== 'table') {
      table = $(table).next()
      if (($(table)[0] as cheerio.TagElement).name === 'div') {
        table = $(table).children('table')
        break
      }
    }
    $(table)
      .children('tbody')
      .children('tr')
      .each((index, element) => {
        if ($(element).children('td').length === 1) {
          return
        }
        $(element)
          .children('td')
          .each((rowIndex, row) => {
            if (index % 2 === 0) {
              if ($(row).children('a').length !== 0) {
                names.push($(row).children('a').children('span').text())
              } else {
                names.push($(row).text().replace('\n', ''))
                // Minior
                if ($(row).children('a').length !== 0 && $(row).children('a').attr('class') === 'image') {
                  this.add(forms, names[rowIndex]!, $(row).children('a').children('img').attr('src'), formType, baseName,
                    (index === 1 && rowIndex === 0 && formInfo.replaceDefault), names[rowIndex])
                }
              }
            } else if (index % 2 === 1) {
              this.add(forms, names[rowIndex]!, $(row).children('a').children('img').attr('src'), formType, baseName,
                (index === 1 && rowIndex === 0 && formInfo.replaceDefault), names[rowIndex])
            }
          })
        if (index % 2 === 1) {
          names.length = 0
        }
      })
    return forms
  }
}
