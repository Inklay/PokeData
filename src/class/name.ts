import type { languageCode } from './language.ts'

export class Name {
  public language: languageCode
  public text: string

  public constructor (language : languageCode, text : string) {
    this.language = language
    this.text = text
  } 
}
