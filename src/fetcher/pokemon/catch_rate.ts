import { NaNToMinusOne } from '../utils.ts'

export function getCatchRate ($ : cheerio.Root) : number {
  const catchRate = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'Catch rate\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .text()
  const fixedCatchRate = catchRate.slice(0, catchRate.search(' '))
  return NaNToMinusOne(parseInt(fixedCatchRate))
}
