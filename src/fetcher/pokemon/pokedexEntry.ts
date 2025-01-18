import { Name } from "../../class/name.ts"
import type { Game } from "../../class/games.ts"
import type { Pokedex } from "../../class/pokedex.ts"
import { DexNumber } from "../../class/dexNumber.ts"
import { PokedexEntry } from "../../class/pokedexEntry.ts"

export class PokemonPokedexEntry {
  public entries : PokedexEntry[]
  public form : string

  constructor (form : string) {
    this.entries = []
    this.form = form
  }

  public static append (a : PokemonPokedexEntry[], b : PokemonPokedexEntry[]) {
    b.forEach(entry => {
      const alreadyExisting = a.find(x => x.form === entry.form)
      if (alreadyExisting !== undefined) {
        entry.entries.forEach(formEntry => {
          const alreadyExistingGameEntry = alreadyExisting.entries.find(x => x.game === formEntry.game)
          if (alreadyExistingGameEntry !== undefined) {
            alreadyExistingGameEntry.text = [
              ...alreadyExistingGameEntry.text,
              ...formEntry.text
            ]
          } else {
            alreadyExisting.entries.push(formEntry)
          }
        })
      } else {
        a.push(entry)
      }
    })
  }

  public static addEntry (entries : PokedexEntry[], name : Name, game : Game) {
    name.text = name.text.replaceAll('\n', '')
    const alreadyExisting = entries.find(x => x.game === game)
    if (alreadyExisting !== undefined) {
      alreadyExisting.text.push(name)
    } else {
      entries.push(new PokedexEntry(game, [name]))
    }
  }

  private static romanToInt (romanNumber : string) : number {
    switch (romanNumber) {
      case 'I':
        return 1
      case 'II':
        return 2
      case 'III':
        return 3
      case 'IV':
        return 4
      case 'V':
        return 5
      case 'VI':
        return 6
      case 'VII':
        return 7
      case 'VIII':
        return 8
      case 'IX':
        return 9
    }
    return -1
  }
  
  private static getDexName (generationNumber : number, name : string) : Pokedex | undefined {
    switch (generationNumber) {
      case 1:
        return 'RBY'
      case 2:
        return 'GSC'
      case 3:
        if (name === 'Kanto') {
          return 'FRLG'
        } else {
          return 'RSE'
        }
      case 4:
        if (name === 'SinnohPt:') {
          return 'Pt'
        } else if (name === 'Sinnoh') {
          return 'DP';
        } {
          return 'HGSS'
        }
      case 5:
        if (name === 'UnovaBW:') {
          return 'BW'
        } else {
          return 'B2W2'
        }
      case 6:
        if (name === 'KalosCentral') {
          return 'XYCentral'
        } else if (name === 'KalosCoastal') {
          return 'XYCoastal'
        } else if (name === 'KalosMountain') {
          return 'XYMountain'
        } else {
          return 'ORAS'
        }
      case 7:
        if (name === 'AlolaSM:') {
          return 'SM'
        } else if (name === 'AlolaUSUM:') {
          return 'USUM'
        } else {
          return 'LGPE'
        }
      case 8:
        if (name === 'Galar') {
          return 'SWSH'
        } else if (name === 'GalarIsleofArmor') {
          return 'IOA'
        } else if (name === 'GalarCrownTundra') {
          return 'CT'
        } else if (name === 'Sinnoh') {
          return 'BDSP'
        } else {
          return 'LPA'
        }
      case 9:
        if (name === 'Paldea') {
          return 'SV'
        } else if (name === 'Kitakami') {
          return 'TTM'
        } else if (name === 'Blueberry') {
          return 'BA'
        }
    }
  }
  
  private static getRegionalDex ($ : cheerio.Root, flavorTextId : string, dexNumbers : DexNumber) {
    let element = $(`span${flavorTextId}`).parent()
    if (element[0] === undefined) {
      return
    }
    while (($(element)[0]! as cheerio.TagElement).name !== 'table') {
      element = $(element).next()
    }
    let generationNumber : number
    $(element)
      .children('tbody')
      .children('tr')
      .each((__, generation) => {
        $(generation)
          .children('td')
          .children('table')
          .children('tbody')
          .children('tr')
          .children('th')
          .each((dexIndex, dex) => {
            if (dexIndex === 0) {
              generationNumber = this.romanToInt($(dex).children('small').text().split(' ')[1]!)
              return
            }
            const dexContent = $(dex).children('small').text()
            const numberStart = dexContent.search(' #')
            const dexName = this.getDexName(generationNumber, dexContent.slice(0, numberStart).replaceAll(' ', '').replaceAll(/\s/g,''))
            const dexNumber = dexContent.slice(numberStart + 2)
            if (dexNumber !== '—' && dexName !== undefined) {
              dexNumbers[dexName] = parseInt(dexNumber)
            }
          })
      })
  }
  
  private static getFlavorTextFormName (form : string) : string {
    if (form === 'Original Cap Pikachu') {
      return 'Pikachu Original Cap'
    } else if (form === 'Partner Cap Pikachu') {
      return 'Pikachu Partner Cap'
    } else if (form === 'World Cap Pikachu') {
      return 'Pikachu World Cap'
    }
    return form
  }
  
  private static processCapPikachuFlavorText (game : Game, text : string, flavorText : PokemonPokedexEntry[]) {
    const regions = ['Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola']
    for (const region of regions) {
      const formIndex = flavorText.push({
        form: `Pikachu ${region} Cap`,
        entries: []
      }) - 1
      this.addEntry(flavorText[formIndex]!.entries, new Name('en', text.replace('Hoenn/Sinnoh/Unova/Kalos/Alola', region)), game)
    }
  }
  
  private static processMiniorFlavorText (game : Game, text  : string, flavorText : PokemonPokedexEntry[]) {
    const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
    for (const color of colors) {
      if (flavorText.find(form => form.form === `Minior ${color} Core`) !== undefined) {
        const formIndex = flavorText.findIndex(form => form.form === `Minior ${color} Core`)
        this.addEntry(flavorText[formIndex]!.entries, new Name('en', text), game)
      } else {
        const formIndex = flavorText.push({
          form: `Minior ${color} Core`,
          entries: []
        }) - 1
        this.addEntry(flavorText[formIndex]!.entries, new Name('en', text), game)
      }
    }
  }
  
  private static getFlavorText ($ : cheerio.Root, flavorTextId : string) : PokemonPokedexEntry[] {
    const flavorText : PokemonPokedexEntry[] = []
    let form = 'default'
    let oldText: string
    let formIndex: number
    let element = $(`span${flavorTextId}`)
      .parent()
      .next('')
    if (element[0] === undefined) {
      return [{ form: 'default', entries: [] }]
    }
    while (($(element)[0]! as cheerio.TagElement).name !== 'table') {
      element = $(element).next()
    }
    $(element)
      .children('tbody')
      .children('tr')
      .each((__, generation) => {
        form = 'default'
        formIndex = 0
        $(generation)
          .children('td')
          .children('table')
          .children('tbody')
          .children('tr:nth-child(2)')
          .children('td')
          .children('table')
          .children('tbody')
          .children('tr')
          .each((__, game) => {
            if ($(game).children('th').children('a').length === 0) {
              if (flavorText.find(f => f.form === 'default') === undefined) {
                form = 'default'
              } else {
                form = this.getFlavorTextFormName($(game).children('th').text().replace('\n', ''))
              }
              return
            }
            if (flavorText.find(f => f.form === form) === undefined) {
              formIndex = flavorText.push({
                form,
                entries: []
              }) - 1
            } else {
              formIndex = flavorText.findIndex(f => f.form === form)
            }
            if ($(game).children('td').length !== 0) {
              oldText = $(game).children('td').text()
            }
            if (!$(game).children('th').text().includes('Stadium') && !$(game).children('th').text().includes('This')) {
              let gameName = $(game).children('th').text().replace('\n', '')
              if (gameName === 'Red(JPN)' || gameName === 'Green') {
                return
              }
              if (gameName === 'Red(ENG)') {
                gameName = 'Red'
              }
              if (gameName.slice(gameName.length - 1) === ' ') {
                gameName = gameName.slice(0, -1)
              }
              if (form === 'Normal') {
                formIndex = flavorText.findIndex(f => f.form === 'default')
              }
              if (form === 'Hoenn, Sinnoh, Unova, Kalos, and Alola Cap Pikachu') {
                this.processCapPikachuFlavorText(gameName as Game, oldText, flavorText)
              } else if (form === 'All Cores') {
                this.processMiniorFlavorText(gameName as Game, oldText, flavorText)
              } else {
                this.addEntry(flavorText[formIndex]!.entries, new Name('en', oldText), gameName as Game)
              }
            }
          })
      })
    
    // Alcremie does not have a 'default' form :(
    if (flavorText[0]?.entries.length === 0 && flavorText.length > 1) {
      flavorText[0].entries = flavorText[1]!.entries
    }
    return flavorText
  }
  
  public static get ($ : cheerio.Root, dexNumbers : DexNumber, entries : PokemonPokedexEntry[]) {
    let flavorTextId: string
    $('a[href=\'#Game_data\']')
      .next('ul')
      .children('li')
      .each((__, element) => {
        $(element)
          .children('a')
          .children('span')
          .each((__, link) => {
            if ($(link).attr('class') === 'toctext' && $(link).text() === 'Pokédex entries') {
              flavorTextId = $(link).parent().attr('href')?.replace('.C3.A9', 'é')!
            }
          })
      })
    this.getRegionalDex($, flavorTextId!, dexNumbers)
    const newEntries = this.getFlavorText($, flavorTextId!)
    this.append(entries, newEntries)
    return entries
  }
}
