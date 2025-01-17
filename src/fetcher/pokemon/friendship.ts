import { NaNToMinusOne } from '../utils.ts'

export function getFriendship ($ : cheerio.Root) : number {
  return NaNToMinusOne(parseInt($('table.roundy > tbody > tr > td.roundy > b > a[title=\'List of Pokémon by base friendship\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .text()))
}
