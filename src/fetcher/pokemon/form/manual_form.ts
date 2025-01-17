export class ManualForm {
  public tableId : string
  public isCosplayPikachu : boolean
  public replaceDefault : boolean

  private constructor (tableId : string, isCosplayPikachu : boolean, replaceDefault : boolean) {
    this.tableId = tableId
    this.isCosplayPikachu = isCosplayPikachu
    this.replaceDefault = replaceDefault
  }

  public static getInfo (fullName : string) : ManualForm {
    let tableId = ''
    let isCosplayPikachu = false
    let replaceDefault = false
    switch (fullName) {
      case 'Cosplay Pikachu':
        tableId = 'Cosplay_Pikachu_2'
        isCosplayPikachu = true
        break
      case 'Pikachu in a cap':
        tableId = 'Pikachu_in_a_cap'
        break
      case 'Unown':
      case 'Vivillon':
        tableId = 'Forms'
        replaceDefault = true
        break
      case 'Furfrou':
        tableId = 'Forms'
        replaceDefault = true
        break
      case 'Core':
        tableId = 'Forms'
        break
    }
    return new ManualForm(tableId, isCosplayPikachu, replaceDefault)
  }
}
