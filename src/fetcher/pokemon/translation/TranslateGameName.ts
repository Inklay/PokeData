import type { Game } from '../../../class/games.ts'

export function getFRGameName (gameName : string) : Game[] {
  const games : Game[] = []
  if (gameName.search('Rouge') !== -1 && gameName.search('Rouge Feu') === -1) {
    games.push('Red')
  }
  if (gameName.search('Bleu') !== -1) {
    games.push('Blue')
  }
  if (gameName.search('Jaune') !== -1) {
    games.push('Yellow')
  }
  if (gameName.search('Or') !== -1 && gameName.search('Or HeartGold') === -1) {
    games.push('Gold')
  }
  if (gameName.search('Argent') !== -1 && gameName.search('Argent SoulSilver') === -1) {
    games.push('Silver')
  }
  if (gameName.search('Cristal') !== -1) {
    games.push('Crystal')
  }
  if (gameName.search('Rubis') !== -1 && gameName.search('Rubis Oméga') === -1) {
    games.push('Ruby')
  }
  if (gameName.search('Saphir') !== -1 && gameName.search('Saphir Alpha') === -1) {
    games.push('Sapphire')
  }
  if (gameName.search('Émeraude') !== -1) {
    games.push('Emerald')
  }
  if (gameName.search('Rouge Feu') !== -1) {
    games.push('FireRed')
  }
  if (gameName.search('Vert Feuille') !== -1) {
    games.push('LeafGreen')
  }
  if (gameName.search('Diamant') !== -1 && gameName.search('Diamant Étincelant') === -1) {
    games.push('Diamond')
  }
  if (gameName.search('Perle') !== -1 && gameName.search('Perle Scintillante') === -1) {
    games.push('Pearl')
  }
  if (gameName.search('Platine') !== -1) {
    games.push('Platinum')
  }
  if (gameName.search('Or HeartGold') !== -1) {
    games.push('HeartGold')
  }
  if (gameName.search('Argent SoulSilver') !== -1) {
    games.push('SoulSilver')
  }
  if (gameName.search('Noir') !== -1 && gameName.search('Noir 2') === -1) {
    games.push('Black')
  }
  if (gameName.search('Blanc') !== -1 && gameName.search('Blanc 2') === -1) {
    games.push('White')
  }
  if (gameName.search('Noir 2') !== -1) {
    games.push('Black 2')
  }
  if (gameName.search('Blanc 2') !== -1) {
    games.push('White 2')
  }
  if (gameName.search('X') !== -1) {
    games.push('X')
  }
  if (gameName.search('Y') !== -1) {
    games.push('Y')
  }
  if (gameName.search('Rubis Oméga') !== -1) {
    games.push('Omega Ruby')
  }
  if (gameName.search('Saphir Alpha') !== -1) {
    games.push('Alpha Sapphire')
  }
  if (gameName.search('Soleil') !== -1 && gameName.search('Ultra-Soleil') === -1) {
    games.push('Sun')
  }
  if (gameName.search('Lune') !== -1 && gameName.search('Ultra-Lune') === -1) {
    games.push('Moon')
  }
  if (gameName.search('Ultra-Soleil') !== -1) {
    games.push('Ultra Sun')
  }
  if (gameName.search('Ultra-Lune') !== -1) {
    games.push('Ultra Moon')
  }
  if (gameName.search('Let\'s Go, Pikachu') !== -1) {
    games.push('Let\'s Go Pikachu')
  }
  if (gameName.search('Let\'s Go, Évoli') !== -1) {
    games.push('Let\'s Go Eevee')
  }
  if (gameName.search('Épée') !== -1) {
    games.push('Sword')
  }
  if (gameName.search('Bouclier') !== -1) {
    games.push('Shield')
  }
  if (gameName.search('Diamant Étincelant') !== -1) {
    games.push('Brilliant Diamond')
  }
  if (gameName.search('Perle Scintillante') !== -1) {
    games.push('Shining Pearl')
  }
  if (gameName.search(': Arceus') !== -1) {
    games.push('Legends: Arceus')
  }
  if (gameName.search('Écarlate') !== -1) {
    games.push('Scarlet')
  }
  if (gameName.search('Violet') !== -1) {
    games.push('Violet')
  }
  return games
}

export function getDEGameName (gameName : string[]) : Game[] {
  const games : Game[] = []
  if (gameName.includes('Pokémon Rot')) {
    games.push('Red')
  }
  if (gameName.includes('Pokémon Blau')) {
    games.push('Blue')
  }
  if (gameName.includes('Pokémon Gelb')) {
    games.push('Yellow')
  }
  if (gameName.includes('Pokémon Gold')) {
    games.push('Gold')
  }
  if (gameName.includes('Pokémon Silber')) {
    games.push('Silver')
  }
  if (gameName.includes('Pokémon Kristall')) {
    games.push('Crystal')
  }
  if (gameName.includes('Pokémon Rubin')) {
    games.push('Ruby')
  }
  if (gameName.includes('Pokémon Saphir')) {
    games.push('Sapphire')
  }
  if (gameName.includes('Pokémon Feuerrot')) {
    games.push('FireRed')
  }
  if (gameName.includes('Pokémon Blattgrün')) {
    games.push('LeafGreen')
  }
  if (gameName.includes('Pokémon Smaragd')) {
    games.push('Emerald')
  }
  if (gameName.includes('Pokémon Diamant')) {
    games.push('Diamond')
  }
  if (gameName.includes('Pokémon Perl')) {
    games.push('Pearl')
  }
  if (gameName.includes('Pokémon Platin')) {
    games.push('Platinum')
  }
  if (gameName.includes('Pokémon Goldene Edition HeartGold')) {
    games.push('HeartGold')
  }
  if (gameName.includes('Pokémon Silberne Edition SoulSilver')) {
    games.push('SoulSilver')
  }
  if (gameName.includes('Pokémon Schwarze Edition')) {
    games.push('Black')
  }
  if (gameName.includes('Pokémon Weiße Edition')) {
    games.push('White')
  }
  if (gameName.includes('Pokémon Schwarze Edition 2')) {
    games.push('Black 2')
  }
  if (gameName.includes('Pokémon Weiße Edition 2')) {
    games.push('White 2')
  }
  if (gameName.includes('Pokémon X')) {
    games.push('X')
  }
  if (gameName.includes('Pokémon Y')) {
    games.push('Y')
  }
  if (gameName.includes('Pokémon Omega Rubin')) {
    games.push('Omega Ruby')
  }
  if (gameName.includes('Pokémon Alpha Saphir')) {
    games.push('Alpha Sapphire')
  }
  if (gameName.includes('Pokémon Sonne')) {
    games.push('Sun')
  }
  if (gameName.includes('Pokémon Mond')) {
    games.push('Moon')
  }
  if (gameName.includes('Pokémon Ultrasonne')) {
    games.push('Ultra Sun')
  }
  if (gameName.includes('Pokémon Ultramond')) {
    games.push('Ultra Moon')
  }
  if (gameName.includes('Pokémon:﻿ Let\'s Go,﻿ Pikachu!')) {
    games.push('Let\'s Go Pikachu')
  }
  if (gameName.includes('Pokémon:﻿ Let\'s Go,﻿ Evoli!')) {
    games.push('Let\'s Go Eevee')
  }
  if (gameName.includes('Pokémon Schwert')) {
    games.push('Sword')
  }
  if (gameName.includes('Pokémon Schild')) {
    games.push('Shield')
  }
  if (gameName.includes('Pokémon Strahlender Diamant')) {
    games.push('Brilliant Diamond')
  }
  if (gameName.includes('Pokémon Leuchtende Perle')) {
    games.push('Shining Pearl')
  }
  if (gameName.includes('Pokémon-Legenden:﻿ Arceus')) {
    games.push('Legends: Arceus')
  }
  if (gameName.includes('Pokémon Karmesin')) {
    games.push('Scarlet')
  }
  if (gameName.includes('Pokémon Purpur')) {
    games.push('Violet')
  }
  return games
}

export function getITGameName (gameName : string) : Game[] {
  const games : Game[] = []
  if (gameName.includes('Rosso')) {
    games.push('Red')
  }
  if (gameName.includes('Blu')) {
    games.push('Blue')
  }
  if (gameName.includes('Giallo')) {
    games.push('Yellow')
  }
  if (gameName.includes('Oro')) {
    games.push('Gold')
  }
  if (gameName.includes('Argento')) {
    games.push('Silver')
  }
  if (gameName.includes('Cristallo')) {
    games.push('Crystal')
  }
  if (gameName.includes('Rubino')) {
    games.push('Ruby')
  }
  if (gameName.includes('Zaffiro')) {
    games.push('Sapphire')
  }
  if (gameName.includes('Rosso Fuoco')) {
    games.push('FireRed')
  }
  if (gameName.includes('Verde Foglia')) {
    games.push('LeafGreen')
  }
  if (gameName.includes('Smeraldo')) {
    games.push('Emerald')
  }
  if (gameName.includes('Diamante')) {
    games.push('Diamond')
  }
  if (gameName.includes('Perla')) {
    games.push('Pearl')
  }
  if (gameName.includes('Platino')) {
    games.push('Platinum')
  }
  if (gameName.includes('HeartGold')) {
    games.push('HeartGold')
  }
  if (gameName.includes('SoulSilver')) {
    games.push('SoulSilver')
  }
  if (gameName.includes('Nero')) {
    games.push('Black')
  }
  if (gameName.includes('Bianco')) {
    games.push('White')
  }
  if (gameName.includes('Nero 2')) {
    games.push('Black 2')
  }
  if (gameName.includes('Bianco 2')) {
    games.push('White 2')
  }
  if (gameName.includes('X')) {
    games.push('X')
  }
  if (gameName.includes('Y')) {
    games.push('Y')
  }
  if (gameName.includes('Rubino Omega')) {
    games.push('Omega Ruby')
  }
  if (gameName.includes('Zaffiro Alpha')) {
    games.push('Alpha Sapphire')
  }
  if (gameName.includes('Sole')) {
    games.push('Sun')
  }
  if (gameName.includes('Luna')) {
    games.push('Moon')
  }
  if (gameName.includes('Ultrasole')) {
    games.push('Ultra Sun')
  }
  if (gameName.includes('Ultraluna')) {
    games.push('Ultra Moon')
  }
  if (gameName.includes('Let\'s Go, Pikachu!')) {
    games.push('Let\'s Go Pikachu')
  }
  if (gameName.includes('Let\'s Go, Eevee!')) {
    games.push('Let\'s Go Eevee')
  }
  if (gameName.includes('Spada')) {
    games.push('Sword')
  }
  if (gameName.includes('Scudo')) {
    games.push('Shield')
  }
  if (gameName.includes('Diamante Lucente')) {
    games.push('Brilliant Diamond')
  }
  if (gameName.includes('Perla Splendente')) {
    games.push('Shining Pearl')
  }
  if (gameName.includes('Leggende Pokémon: Arceus')) {
    games.push('Legends: Arceus')
  }
  if (gameName.includes('Scarlatto')) {
    games.push('Scarlet')
  }
  if (gameName.includes('Violetto')) {
    games.push('Violet')
  }
  return games
}

export function getESGameName (gameName : string) : Game[] {
  const games : Game[] = []
  if (gameName.includes('Rojo')) {
    games.push('Red')
  }
  if (gameName.includes('Azul')) {
    games.push('Blue')
  }
  if (gameName.includes('Amarillo')) {
    games.push('Yellow')
  }
  if (gameName.includes('Oro')) {
    games.push('Gold')
  }
  if (gameName.includes('Plata')) {
    games.push('Silver')
  }
  if (gameName.includes('Cristal')) {
    games.push('Crystal')
  }
  if (gameName.includes('Rubí')) {
    games.push('Ruby')
  }
  if (gameName.includes('Zafiro')) {
    games.push('Sapphire')
  }
  if (gameName.includes('Rojo Fuego')) {
    games.push('FireRed')
  }
  if (gameName.includes('Verde Hoja')) {
    games.push('LeafGreen')
  }
  if (gameName.includes('Esmeralda')) {
    games.push('Emerald')
  }
  if (gameName.includes('Diamante')) {
    games.push('Diamond')
  }
  if (gameName.includes('Perla')) {
    games.push('Pearl')
  }
  if (gameName.includes('Platino')) {
    games.push('Platinum')
  }
  if (gameName.includes('Oro HeartGold')) {
    games.push('HeartGold')
  }
  if (gameName.includes('Plata SoulSilver')) {
    games.push('SoulSilver')
  }
  if (gameName.includes('Negro')) {
    games.push('Black')
  }
  if (gameName.includes('Blanco')) {
    games.push('White')
  }
  if (gameName.includes('Negro 2')) {
    games.push('Black 2')
  }
  if (gameName.includes('Blanco 2')) {
    games.push('White 2')
  }
  if (gameName.includes('Pokémon X')) {
    games.push('X')
  }
  if (gameName.includes('Pokémon Y')) {
    games.push('Y')
  }
  if (gameName.includes('Rubí Omega')) {
    games.push('Omega Ruby')
  }
  if (gameName.includes('Zafiro Alfa')) {
    games.push('Alpha Sapphire')
  }
  if (gameName.includes('Sol')) {
    games.push('Sun')
  }
  if (gameName.includes('Luna')) {
    games.push('Moon')
  }
  if (gameName.includes('Ultrasol')) {
    games.push('Ultra Sun')
  }
  if (gameName.includes('Ultraluna')) {
    games.push('Ultra Moon')
  }
  if (gameName.includes('Let\'s Go, Pikachu!')) {
    games.push('Let\'s Go Pikachu')
  }
  if (gameName.includes('Let\'s Go, Eevee!')) {
    games.push('Let\'s Go Eevee')
  }
  if (gameName.includes('Espada')) {
    games.push('Sword')
  }
  if (gameName.includes('Escudo')) {
    games.push('Shield')
  }
  if (gameName.includes('Diamante Brillante')) {
    games.push('Brilliant Diamond')
  }
  if (gameName.includes('Perla Reluciente')) {
    games.push('Shining Pearl')
  }
  if (gameName.includes('Leyendas: Arceus')) {
    games.push('Legends: Arceus')
  }
  if (gameName.includes('Escarlata')) {
    games.push('Scarlet')
  }
  if (gameName.includes('Púrpura')) {
    games.push('Violet')
  }
  return games
}
