export class Sprite {
  public name : string
  public url : string
  public shiny_url : string | undefined

  constructor (name : string, url : string, shiny_url : string | undefined) {
    this.name = name
    this.url = url
    this.shiny_url = shiny_url
  }
}
