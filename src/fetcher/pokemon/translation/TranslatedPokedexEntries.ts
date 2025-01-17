import { load } from 'cheerio'
import { Name } from '../../../class/name.ts'
import type { Game } from '../../../class/games.ts'
import type { ManualDataForm } from '../manual_data/form.ts'
import type { languageCode } from '../../../class/language.ts'
import { PokedexEntry } from '../../../class/pokedexEntry.ts'
import { getDEGameName, getESGameName, getFRGameName, getITGameName } from './TranslateGameName.ts'

export class TranslatedPokedexEntries {
  public entries : PokedexEntry[]
  public form : string

  constructor (form : string) {
    this.entries = []
    this.form = form
  }
  
  public static async getTranslation ($ : cheerio.Root, name : Name, keywords : ManualDataForm[]) : Promise<TranslatedPokedexEntries[]> {
    switch (name.language) {
      case 'fr':
        return await this.getFR($, keywords, name)
      case 'de':
        return this.getDE($, keywords)
      // case 'it':
      //   return getITPokedexEntries($, keywords)
      // case 'es':
      //   return getESPokedexEntries($, keywords)
      // case 'ja':
      //   return getJAPokedexEntries($, keywords)
      // case 'zh-Hant':
      //   return getZHHANTPokedexEntries($, keywords)
    }
    return []
  }
      
  private static getIndexOf (form : string, array : TranslatedPokedexEntries[]) : number{
    let index = array.findIndex(f => f.form === form)
    if (index === -1) {
      index = array.push(new TranslatedPokedexEntries(form)) - 1
    }
    return index
  }

  private static insertEntry (games : Game[], form : string, data : TranslatedPokedexEntries[], entry : string, language : languageCode) {
    for (let i = 0; i < games.length; i++) {
      data[this.getIndexOf(form, data)]!.entries.push(new PokedexEntry(games[i]!, new Name(language, entry)))
    }
  }

  private static getKeyword (keywords : ManualDataForm[], value : string, defaultFormName : string, language : languageCode) : string | undefined {
    if (value.toLowerCase() === defaultFormName) {
      return 'default'
    }
    console.log(value)
    for (let i = 0; i < keywords.length; i++) {
      if (keywords[i]!.flavor_texts_keyword === undefined) {
        continue
      }
      const keyword = keywords[i]!.flavor_texts_keyword.find(text => text.language === language)
      if (keyword !== undefined && keyword.text === value) {
        return keywords[i]!.flavor_texts_keyword.find(text => text.language === 'en')!.text
      }
    }
  }

  private static async getFR ($ : cheerio.Root, keywords : ManualDataForm[], name : Name) : Promise<TranslatedPokedexEntries[]> {
    const data : TranslatedPokedexEntries[] = []
    const currentGen = 9
    const startGen = currentGen - $('span[id="Descriptions_du_Pokédex"]').parent().next().children('tbody').children('tr').children('td').length + 2
    let games : Game[] = []

    for (let gen = startGen; gen < currentGen; gen++) {
      let $gen : cheerio.Root
      if (gen === currentGen - 1) {
        $gen = $
      } else {
        const URL = `https://www.pokepedia.fr/${name.text}/Génération_${gen}`
        const pageHTML = await (await fetch(URL)).text()
        $gen = load(pageHTML)
      }
      let elem = $gen('span[id="Descriptions_du_Pokédex"]').parent().next('table')
      let skip = false
      let form : string | undefined = 'default'
      if ($gen(elem).length === 0) {
        continue
      }
      elem = $gen(elem).next()
      while ($gen(elem)[0] !== undefined && ($gen(elem)[0] as cheerio.TagElement).name !== 'h2') {
        if (($gen(elem)[0] as cheerio.TagElement).name === 'h3' || ($gen(elem)[0] as cheerio.TagElement).name === 'h4') {
          form = this.getKeyword(keywords, $gen(elem).text().replace('[modifier]', ''), 'forme normale', 'fr')
          if (form === undefined) {
            skip = true
          }
        } else if (($gen(elem)[0] as cheerio.TagElement).name === 'dl' && !skip) {
          let entry = $gen(elem).children('dt').first()
          do {
            const text = $gen(entry).text().replace('\n', '')
            if (($gen(entry)[0] as cheerio.TagElement).name === 'dt') {
              games = getFRGameName(text)
            } else if (($gen(entry)[0] as cheerio.TagElement).name === 'dd') {
              this.insertEntry(games, form!, data, text, 'fr')
            }
            entry = $gen(entry).next()
          } while ($gen(entry).length !== 0)
        }
        elem = $gen(elem).next()
      }
    }
    return data
  }

  private static getDE ($ : cheerio.Root, keywords : ManualDataForm[]) : TranslatedPokedexEntries[] {
    const data : TranslatedPokedexEntries[] = []
    let elem = $('span[id="Pokédex-Einträge"]').parent().next()
    let form : string | undefined = 'default'
    let skip = false
    let isFirstForm = true
    while (($(elem)[0] as cheerio.TagElement).name !== 'h3') {
      if (($(elem)[0] as cheerio.TagElement).name === 'dl') {
        if (!skip && isFirstForm) {
          isFirstForm = false
        } else {
          form = this.getKeyword(keywords, $(elem).text(), 'normalform', 'de')
          skip = form === undefined
        }
      } else if (($(elem)[0] as cheerio.TagElement).name === 'div' && !skip) {
        $(elem).children('div').each((genIndex, gen) => {
          if (genIndex === 0) {
            return
          }
          let games : Game[] = []
          $(gen).children('div').each((index, value) => {
            if (index === 0) {
              return
            }
            if (index % 2 === 1) {
              const DEgames : string[] = []
              $(value).children('span').children('a').each((__, game) => {
                DEgames.push($(game).children('span').attr('title')!)
              })
              games = getDEGameName(DEgames)
            } else {
              this.insertEntry(games, form!, data, $(value).text(), 'de')
            }
          })
        })
      }
      elem = $(elem).next()
    }
    return data
  }
}

// function getITPokedexEntries ($, keywords) {
//   const data = []
//   let elem
//   $('a[href="#Dati_di_gioco"]').next().children('li').each((__, value) => {
//     if ($(value).text().includes('Voci Pokédex')) {
//       const id = $(value).children('a').attr('href').substring(1)
//       elem = $(`span[id="${id}"]`).parent().next()
//     }
//   })
//   let form = 'default'
//   let skip = false
//   let isFirstForm = true
//   let games
//   while ($(elem)[0].name !== 'h3') {
//     if ($(elem)[0].name === 'h4') {
//       if (!skip && isFirstForm) {
//         isFirstForm = false
//       } else {
//         form = getKeyword(keywords, $(elem).text(), '', 'it')
//         skip = form === undefined
//       }
//     } else if ($(elem)[0].name === 'div' && !skip) {
//       $(elem).children('div').each((genIndex, gen) => {
//         if (genIndex === 0 && $(gen).attr('class') === 'black-text') {
//           return
//         }
//         $(gen).children('div').children('div').each((index, value) => {
//           if (index === 0) {
//             return
//           }
//           if (index % 2 === 1) {
//             const ITgames = []
//             $(value).children('div').children('div').each((__, game) => {
//               ITgames.push($(game).text())
//             })
//             games = getITGameName(ITgames)
//           } else {
//             insertEntry(games, form, data, $(value).text(), 'it')
//           }
//         })
//       })
//     }
//     elem = $(elem).next()
//   }
//   return data
// }

// function getESPokedexEntries ($, keywords) {
//   const data = []
//   $('#Descripción_Pokédex').parent().next().next().children('tbody').children('tr').each((index, value) => {
//     if (index === 0) {
//       return
//     }
//     let form = 'default'
//     const ESGames = []
//     let isFirstForm = true
//     const game = $(value).children('th:nth-child(2)')
//     if ($(game).children('a').length === 0) {
//       $(game).children('div').children('div').each((__, gameName) => {
//         ESGames.push($(gameName).text())
//       })
//     } else {
//       ESGames.push($(game).children('a').text())
//     }
//     const games = getESGameName(ESGames)
//     const entries = $(value).children('td')
//     if ($(entries).children('ul').length === 0) {
//       insertEntry(games, form, data, $(entries).text(), 'es')
//     } else {
//       $(entries).children('ul').children('li').each((__, entry) => {
//         const esFormName = $(entry).children('b').text()
//         if (isFirstForm) {
//           isFirstForm = false
//         } else {
//           form = getKeyword(keywords, esFormName, '', 'es')
//         }
//         if (form !== undefined) {
//           insertEntry(games, form, data, $(entry).text().replace(`${esFormName}: `, ''), 'es')
//         }
//       })
//     }
//   })
//   return data
// }

// function getJAPokedexEntries ($, keywords) {
//   const data = []
//   return data
// }

// function getZHHANTPokedexEntries ($, keywords) {
//   const data = []
//   return data
// }
