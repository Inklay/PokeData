import { ManualDataForm } from './form.ts'

export class ManualData {
  public id : number
  public forms : ManualDataForm[]

  constructor (id : number, forms : ManualDataForm[]) {
    this.id = id
    this.forms = forms
  }
}
