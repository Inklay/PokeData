import type { DexNumber } from "../../class/dexNumber.ts"
import type { Game } from "../../class/games.ts"

export class PokemonPokedexEntry {
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
  
  private static getDexName (generationNumber : number, name : string) : string | undefined {
    switch (generationNumber) {
      case 1:
        return 'RBY'
      case 2:
        return 'GSC'
      case 3:
        if (name === 'Kanto') {
          return 'FRLF'
        } else {
          return 'RSE'
        }
      case 4:
        if (name === 'Sinnoh') {
          return 'DPPt'
        } else {
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
        } else if (name === 'GalarIsle of Armor') {
          return 'IOA'
        } else if (name === 'GalarCrown Tundra') {
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
        }
    }
  }
  
  private static processRegionalDex ($ : cheerio.Root, flavorTextId : string, dexNumbers) {
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
            const dexName = this.getDexName(generationNumber, dexContent.slice(0, numberStart))
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
  
  private static processCapPikachuFlavorText (game : Game, text :string, flavorText) {
    const regions = ['Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola']
    for (const region of regions) {
      const formIndex = flavorText.push({
        form: `Pikachu ${region} Cap`,
        entries: []
      }) - 1
      flavorText[formIndex].entries.push({
        game,
        texts: [
          {
            name: text.replace('Hoenn/Sinnoh/Unova/Kalos/Alola', region),
            language: 'en'
          }
        ]
      })
    }
  }
  
  private static processMiniorFlavorText (game, text, flavorText) {
    const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
    for (const color of colors) {
      if (flavorText.find(form => form.form === `Minior ${color} Core`) !== undefined) {
        const formIndex = flavorText.findIndex(form => form.form === `Minior ${color} Core`)
        flavorText[formIndex].entries.push({
          game,
          texts: [
            {
              name: text,
              language: 'en'
            }
          ]
        })
      } else {
        const formIndex = flavorText.push({
          form: `Minior ${color} Core`,
          entries: []
        }) - 1
        flavorText[formIndex].entries.push({
          game,
          texts: [
            {
              name: text,
              language: 'en'
            }
          ]
        })
      }
    }
  }
  
  private static getFlavorText ($ : cheerio.Root, flavorTextId) {
    const flavorText = []
    let form = 'default'
    let oldText
    let formIndex
    let element = $(`span${flavorTextId}`)
      .parent()
      .next('')
    if (element[0] === undefined) {
      return [{ form: 'default', entries: [] }]
    }
    while ($(element)[0].name !== 'table') {
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
                form = getFlavorTextFormName($(game).children('th').text().replace('\n', ''))
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
              if (gameName.slice(gameName.length - 1) === ' ') {
                gameName = gameName.slice(0, -1)
              }
              if (form === 'Normal') {
                formIndex = flavorText.findIndex(f => f.form === 'default')
              }
              if (form === 'Hoenn, Sinnoh, Unova, Kalos, and Alola Cap Pikachu') {
                processCapPikachuFlavorText(gameName, oldText, flavorText)
              } else if (form === 'All Cores') {
                processMiniorFlavorText(gameName, oldText, flavorText)
              } else {
                flavorText[formIndex].entries.push({
                  game: gameName,
                  texts: [
                    {
                      name: oldText,
                      language: 'en'
                    }
                  ]
                })
              }
            }
          })
      })
    // Alcremie does not have a 'default' form :(
    if (flavorText[0].entries.length === 0 && flavorText.length > 1) {
      flavorText[0].entries = flavorText[1].entries
    }
    return flavorText
  }
  
  public static getPokedexEntries ($ : cheerio.Root, dexNumbers : DexNumber, translatedFlavorTexts) {
    let flavorTextId
    $('a[href=\'#Game_data\']')
      .next('ul')
      .children('li')
      .each((__, element) => {
        $(element)
          .children('a')
          .children('span')
          .each((__, link) => {
            if ($(link).attr('class') === 'toctext' && $(link).text() === 'Pokédex entries') {
              flavorTextId = $(link).parent().attr('href').replace('.C3.A9', 'é')
            }
          })
      })
    processRegionalDex($, flavorTextId, dexNumbers)
    const data = processFlavorText($, flavorTextId)
    for (let i = 0; i < data.length; i++) {
      if (translatedFlavorTexts === undefined) {
        console.log(dexNumbers)
      }
      for (let j = 0; j < translatedFlavorTexts.length; j++) {
        if (data[i].form === translatedFlavorTexts[j].form) {
          for (let k = 0; k < data[i].entries.length; k++) {
            const entry = translatedFlavorTexts[j].entries.find(e => e.game === data[i].entries[k].game)
            if (entry !== undefined) {
              data[i].entries[k].texts = [
                ...data[i].entries[k].texts,
                ...entry.texts
              ]
            }
          }
        }
      }
    }
    return data
  }
}
