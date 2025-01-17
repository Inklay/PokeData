import fs from 'fs'
import * as cheerio from 'cheerio'
import { wikis } from '../wiki.ts'
import { PokemonType } from './type.ts'
import { PokemonStats } from './stats.ts'
import { Item } from '../../class/item.ts'
import { DexNumber } from './dex_number.ts'
import { PokemonHeight } from './height.ts'
import { getOtherNames } from '../utils.ts'
import { PokemonWeight } from './weight.ts'
import { PokemonForm } from './form/form.ts'
import { getEggGroups } from './egg_group.ts'
import { getCatchRate } from './catch_rate.ts'
import { getFriendship } from './friendship.ts'
import { getGrowthRate } from './growth_rate.ts'
import { Ability } from '../../class/ability.ts'
import { Pokemon } from '../../class/pokemon.ts'
import { getGenderRatio } from './gender_ratio.ts'
import { ManualData } from './manual_data/manual_data.ts'
import { TranslatedData } from './translation/TranslatedData.ts'

export class PokemonFetcher extends Pokemon {
  private static URLList : string[] = []
  private static manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf-8')) as ManualData[]

  public static async getURLList () : Promise<string[]> {
    await this._getURLList()
    return this.URLList
  }

  private static async _getURLList () : Promise<void> {
    const URL = `${wikis.get('en')}List_of_Pokémon_by_National_Pokédex_number`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)
    
    // Get all tables with class roundy (one for each generation)
    $('table.roundy').each((__, tbody) => {
      // Get all links in the third column of each table row (link to pokemon page)
      $('tbody tr td:nth-child(3) a', tbody).each((__, pokemonLink) => {
        const url = $(pokemonLink).attr('href')!
        // Skip different forms
        if (url.search('(type)') !== -1) {
          return
        }
        this.URLList.push(url.replace('/wiki/', ''))
      })
    })
  }

  public static async getAll (abilities : Ability[], items : Item[]) : Promise<Pokemon[]> {
    this._getURLList()
    console.log(`Getting data for ${this.URLList.length} pokemon`)
    let data : Pokemon[] = []

    for (let i = 0; i < this.URLList.length; i++) {
      data = [...data, ...(await this.get(this.URLList[i]!, abilities, items))]
      if (i !== 0 && i % 100 === 0) {
        console.log(`Got data for ${i}/${this.URLList.length} pokemon`)
      }
    }
    return data
  }

  public static async get (pokemonURL : string, abilities : Ability[], items : Item[]) : Promise<Pokemon[]> {
    // Can happen with automated tests
    if (pokemonURL === undefined) {
      return []
    }

    const pokemons : Pokemon[] = []
    const URL = `${wikis.get('en')}${pokemonURL}`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)
    const forms = PokemonForm.get($)
    const dexNumbers = DexNumber.getNat($)
    const types = PokemonType.get($, forms[0]!.names[0]!.text)
    const baseFriendship = getFriendship($)
    const catchRate = getCatchRate($)
    const height = PokemonHeight.get($)
    const weight = PokemonWeight.get($)
    const eggGroups = getEggGroups($)
    const genderRatio = getGenderRatio($)
    const growthRate = getGrowthRate($)
    const stats = PokemonStats.get($)
    const otherNames = getOtherNames($, true)
    const translatedData = await TranslatedData.getTranslatedData(otherNames, this.manualData, dexNumbers.nat)
    console.log(JSON.stringify(forms))
    // const abilityList = PokemonAbility.get($, abilities)
    // const category = getCategory($, pokemons[0].names[0].name, translatedData.category)
    // const flavorText = getPokedexEntries($, dexNumbers, translatedData.flavor_text)

    // For unreleased Pokémon
    if (forms[0] === undefined) {
      console.log(pokemonURL)
    }
    if (forms[0]!.names[0] !== undefined && forms[0]!.names[0].text === '') {
      forms[0]!.names[0].text = pokemonURL.replace('/wiki/', '').replace('_(Pok%C3%A9mon)', '')
    }
    
    // if (flavorText === undefined) {
    //   console.log(`No flavor text found for ${pokemons[0].names[0].name}`)
    // }
    if (stats === undefined) {
      console.log(`No stats found for ${forms[0]!.names[0]!.text}`)
    }

    forms.forEach((form) => {
      const pokemon = new Pokemon()

      pokemon.dex_numbers = dexNumbers
      if (form.form_type === 'other') {
        
      }
    })

      // if (pokemons[i].form_type === 'other') {
      //   const data = manualData.find(data => data.id === pokemons[i].dex_numbers.nat)
      //   if (data !== undefined) {
      //     const formData = data.forms.find(form => form.english === pokemons[i].names[0].name)
      //     if (formData) {
      //       pokemons[i].names = [
      //         ...pokemons[i].names,
      //         ...formData.names
      //       ]
      //       if (formData.flavor_texts !== undefined) {
      //         for (let j = 0; j < formData.flavor_texts.length; j++) {
      //           const formText = flavorText.find(text => text.form === pokemons[i].names[0].name)
      //           if (formText !== undefined) {
      //             const gameText = formText.entries.find(entry => entry.game === formData.flavor_texts[j].game)
      //             if (gameText !== undefined) {
      //               gameText.texts = [
      //                 ...gameText.texts,
      //                 ...formData.flavor_texts[j].texts
      //               ]
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // } else if (pokemons[i].form_type === 'default') {
      //   pokemons[i].names = [
      //     ...pokemons[i].names,
      //     ...otherNames
      //   ]
      // } else {
      //   let otherFormNames = []
      //   if (pokemons[i].form_type === 'alola') {
      //     otherFormNames = createAlolanNames(otherNames)
      //   } else if (pokemons[i].form_type === 'galar') {
      //     otherFormNames = createGalarianNames(otherNames)
      //   } else if (pokemons[i].form_type === 'gmax') {
      //     otherFormNames = createGigantamaxNames(otherNames)
      //   } else if (pokemons[i].form_type === 'hisui') {
      //     otherFormNames = createHisuianNames(otherNames)
      //   } else if (pokemons[i].form_type === 'paldea') {
      //     otherFormNames = createPaldeanNames(otherNames)
      //   } else if (pokemons[i].form_type === 'mega') {
      //     if (pokemons[i].names[0].name.search(' X') !== -1) {
      //       otherFormNames = createMegaNames(otherNames, ' X')
      //     } else if (pokemons[i].names[0].name.search(' Y') !== -1) {
      //       otherFormNames = createMegaNames(otherNames, ' Y')
      //     } else {
      //       otherFormNames = createMegaNames(otherNames, '')
      //     }
      //   } else if (pokemons[i].names[0].name.startsWith('Unown ')) {
      //     otherFormNames = createUnownNames(otherNames, pokemons[i].names[0].name.split(' ')[1])
      //   }
      //   pokemons[i].names = [
      //     ...pokemons[i].names,
      //     ...otherFormNames
      //   ]
      // }
      // let formTypes = types.find(type => type.name === pokemons[i].form_name)
      // // If the form has the same type as the base form
      // if (formTypes === undefined) {
      //   formTypes = types[0]
      // }
      // pokemons[i].types = formTypes.types
      // pokemons[i].base_friendship = baseFriendship
      // pokemons[i].catch_rate = catchRate
      // let formHeight = height.find(height => height.name === pokemons[i].form_name)
      // // If the form has the same height as the base form
      // if (formHeight === undefined) {
      //   formHeight = height[0]
      // }
      // pokemons[i].height = formHeight.height
      // let formWeight = weight.find(weight => weight.name === pokemons[i].form_name)
      // // If the form has the same weight as the base form
      // if (formWeight === undefined) {
      //   formWeight = weight[0]
      // }
      // pokemons[i].weight = formWeight.weight
      // pokemons[i].egg_groups = eggGroups
      // pokemons[i].gender_rate = genderRatio
      // pokemons[i].growth_rate = growthRate
      // let formCategory
      // if (category.length === 1) {
      //   formCategory = category[0]
      // } else if (pokemons[i].form_type === 'default') {
      //   formCategory = category.find(category => category.form === 'default')
      // }
      // if (formCategory === undefined) {
      //   formCategory = category.find(category => category.form === pokemons[i].form_name)
      //   if (formCategory === undefined) {
      //     formCategory = category.find(category => category.form === pokemons[i].form_type)
      //     if (formCategory === undefined) {
      //       formCategory = category.find(category => category.form === 'default')
      //       if (formCategory === undefined) {
      //         formCategory = category[0]
      //       }
      //     }
      //   }
      // }
      // pokemons[i].category = formCategory.categories
      // if (pokemons[i].form_type === 'default') {
      //   if (flavorText.find(flavorText => flavorText.form === 'default') === undefined) {
      //     console.log(pokemonURL)
      //   }
      //   pokemons[i].flavor_texts = flavorText.find(flavorText => flavorText.form === 'default').entries
      // } else {
      //   let formFlavorText = flavorText.find(flavorText => flavorText.form === pokemons[i].names[0].name)
      //   if (formFlavorText === undefined) {
      //     formFlavorText = flavorText.find(flavorText => flavorText.form === pokemons[i].form_name)
      //     if (formFlavorText === undefined) {
      //       formFlavorText = flavorText.find(flavorText => flavorText.form === 'default')
      //     }
      //   }
      //   if (formFlavorText !== undefined) {
      //     pokemons[i].flavor_texts = formFlavorText.entries
      //   }
      // }
      // if (pokemons[i].form_type === 'default') {
      //   if (stats.find(stat => stat.name === 'default') === undefined) {
      //     console.log(pokemons[i].names[0].name, stats)
      //   }
      //   pokemons[i].stats = stats.find(stat => stat.name === 'default').stats
      // } else {
      //   let formStats = stats.find(stat => stat.name === pokemons[i].names[0].name)
      //   if (formStats === undefined) {
      //     formStats = stats.find(stat => stat.name === pokemons[i].form_name)
      //     if (formStats === undefined) {
      //       formStats = stats.find(stat => stat.name === 'default')
      //     }
      //   }
      //   if (formStats !== undefined) {
      //     pokemons[i].stats = formStats.stats
      //   }
      // }
      // const defaultFormAbilities = abilityList.filter(ability => ability.form === 'default' || ability.form === pokemons[0].names[0].name)
      // const otherFormAbilities = abilityList.filter(ability => ability.form !== 'default' && ability.form !== pokemons[0].names[0].name)
      // let formAbility = otherFormAbilities.filter(ability => ability.form === pokemons[i].form_name)
      // // If the form has the same ability as the base form
      // if (formAbility.length === 0) {
      //   formAbility = defaultFormAbilities
      // }
      // pokemons[i].abilities = formAbility
      // pokemons[i].types = formTypes.types
      // // Some issues that are easier to fix here than in the data
      // pokemons[i] = fixRandomStuff(pokemons[i], stats)

    return pokemons
  }
}
