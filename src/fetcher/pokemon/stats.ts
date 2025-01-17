import { NaNToMinusOne } from '../utils.ts'
import { Stats } from '../../class/stats.ts'

export class PokemonStats {
  public name : string
  public stats : Stats[]

  private constructor (stats : Stats[], name : string | undefined = undefined) {
    this.stats = stats
    if (name === undefined) {
      this.name = "default"
    } else {
      this.name = name
    }
  }

  private static processStatsTable ($ : cheerio.Root, table : cheerio.Cheerio) : Stats[] {
    const stats : Stats[] = []
    $(table)
      .children('tbody')
      .children('tr')
      .each((index, stat) => {
        if (index < 2 || index > 7) {
          return
        }
        const rowText = $(stat).children('th').text()
        stats.push(new Stats(NaNToMinusOne(parseInt(rowText.slice(rowText.search(':') + 1))), -1))
      }
    )
    return stats
  }

  public static get ($ : cheerio.Root) : PokemonStats[] {
    let statsId
    let element
    const stats : PokemonStats[] = []
    $('a[href=\'#Game_data\']')
      .next('ul')
      .children('li')
      .each((__, element) => {
        $(element)
          .children('a')
          .children('span')
          .each((__, link) => {
            if ($(link).attr('class') === 'toctext' && ($(link).text() === 'PokemonStats' || $(link).text() === 'Base stats')) {
              statsId = $(link).parent().attr('href')
            }
          })
      })
    const header = $(`span${statsId}`)
      .parent()
      .next()
    if ($(header)[0] === undefined) {
      const noStats : Stats[] = []
      for (let i = 0; i < 6; i++) {
        noStats.push(new Stats(-1, -1))
      }
      return [new PokemonStats(noStats)]
    }
    let skip = false
    let index = 0
    let name
    if (($(header)[0] as cheerio.TagElement).name !== 'table') {
      element = $(header).next()
    } else {
      element = header
    }
    let tagName = ($(element)[0] as cheerio.TagElement).name
    while ($(element)[0] !== undefined && tagName !== 'h4') {
      if (tagName === 'h3' && $(element).text() !== 'Base stats') {
        break
      }
      // Older gen
      if (tagName === 'h5' && $(element).text().includes('Generation') && !$(element).text().includes('onward') && !$(element).text().includes('IX')) {
        skip = true
      // Current gen
      } else if (tagName === 'h5' && ($(element).text().includes('onward') || $(element).text().includes('IX'))) {
        skip = false
      } else if (tagName === 'h5') {
        name = $(element).text()
      } else if (tagName === 'table' && !skip) {
        name = index === 0 ? 'default' : name
        index++
        stats.push(new PokemonStats(this.processStatsTable($, element), name))
      }
      element = $(element).next()
    }
    return stats
  }
}
