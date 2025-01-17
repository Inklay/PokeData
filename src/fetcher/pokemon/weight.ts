import { NaNToMinusOne, isVisible } from '../utils.ts'

export class PokemonWeight {
  public weight : number
  public name : string

  private constructor (weight : number, name : string) {
    this.weight =weight
    this.name = name
  }
  
  public static get ($ : cheerio.Root) : PokemonWeight[] {
    const weightList : PokemonWeight[] = []
    const weightElementArray = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'Weight\']')
      .parent()
      .next('table')
      .children('tbody')
      .children('tr')
    for (let i = 0; i < weightElementArray.length; i += 2) {
      if (!isVisible($, weightElementArray[i]!)) {
        continue
      }
      const weight = NaNToMinusOne(parseFloat($(weightElementArray[i]).children('td').next().text()))
      const name = $(weightElementArray[i + 1]).children('td').children('small').text()
      weightList.push(new PokemonWeight(weight, name))
    }
    return weightList
  }
}
