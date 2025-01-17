import { DexNumber } from '../../class/dexNumber.ts'
import { NaNToMinusOne } from '../utils.ts'

export function getNat ($ : cheerio.Root) : DexNumber {
  return new DexNumber(NaNToMinusOne(parseInt($('table.roundy > tbody > tr > td > table > tbody > tr > th > big > big > a > span').text().replace('#', ''))))
}