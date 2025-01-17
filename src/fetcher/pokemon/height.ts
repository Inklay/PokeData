import { NaNToMinusOne, isVisible } from '../utils.ts'

export class PokemonHeight {
  public height : number
  public name : string

  private constructor (height : number, name : string) {
    this.height = height
    this.name = name
  }

  public static get ($ : cheerio.Root) : PokemonHeight[] {
    const heightList : PokemonHeight[] = []
    const heightElementArray = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'List of Pokémon by height\']')
      .parent()
      .next('table')
      .children('tbody')
      .children('tr')
    for (let i = 0; i < heightElementArray.length; i += 2) {
      if (!isVisible($, heightElementArray[i]!)) {
        continue
      }
      const height = NaNToMinusOne(parseFloat($(heightElementArray[i]).children('td').next().text()))
      const name = $(heightElementArray[i + 1]).children('td').children('small').text()
      heightList.push(new PokemonHeight(height, name))
    }
    return heightList
  }
}
