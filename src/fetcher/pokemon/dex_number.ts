import { NaNToMinusOne } from '../utils.ts'

export class DexNumber {
  public nat : number

  constructor (nat : number) {
    this.nat = nat
  }

  public static getNat ($ : cheerio.Root) : DexNumber {
    return new DexNumber(NaNToMinusOne(parseInt($('table.roundy > tbody > tr > td > table > tbody > tr > th > big > big > a > span').text().replace('#', ''))))
  }
}
