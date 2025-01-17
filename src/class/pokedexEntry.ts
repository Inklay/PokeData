import type { Game } from './games.ts'
import type { Name } from './name.ts'

export class PokedexEntry {
  public game : Game
  public text : Name
  
  constructor (game : Game, text : Name) {
    this.game = game
    this.text = text
  }
}
