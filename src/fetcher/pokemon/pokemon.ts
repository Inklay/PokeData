import fs from 'fs'
import * as cheerio from 'cheerio'
import { wikis } from '../wiki.ts'
import { getNat } from './dexNumber.ts'
import { PokemonType } from './type.ts'
import { Category } from './category.ts'
import { PokemonStats } from './stats.ts'
import { Item } from '../../class/item.ts'
import { PokemonHeight } from './height.ts'
import { getOtherNames } from '../utils.ts'
import { PokemonWeight } from './weight.ts'
import { PokemonForm } from './form/form.ts'
import { getEggGroups } from './eggGroup.ts'
import { getCatchRate } from './catchRate.ts'
import { getFriendship } from './friendship.ts'
import { getGrowthRate } from './growth_rate.ts'
import { Ability } from '../../class/ability.ts'
import { Pokemon } from '../../class/pokemon.ts'
import { getGenderRatio } from './gender_ratio.ts'
import { PokemonFetcherAbility } from './ability.ts'
import { ManualData } from './manual_data/manual_data.ts'
import { TranslatedData } from './translation/TranslatedData.ts'
import * as TranslatedFormName  from './translation/TranslatedFormNames.ts'
import { PokemonPokedexEntry } from './pokedexEntry.ts'

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

    const URL = `${wikis.get('en')}${pokemonURL}`
    const pageHTML = await (await fetch(URL)).text()
    const $ = cheerio.load(pageHTML)
    const forms : Pokemon[] = PokemonForm.get($)
    const dexNumbers = getNat($)
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
    const abilityList = PokemonFetcherAbility.get($, abilities)
    const category = translatedData.category
    Category.get($, forms[0]!.names[0]!.text, category)
    const flavorText = PokemonPokedexEntry.get($, dexNumbers, translatedData.flavor_text)
    
    
    fs.writeFileSync('./tests/result.json', JSON.stringify(translatedData.flavor_text))

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
        if (form.form_type === 'other') {
          const data = this.manualData.find(data => data.id === form.dex_numbers.nat)
          if (data !== undefined) {
            const formData = data.forms.find(form => form.names.find(x => x.language === 'en')!.text === form.names[0]!.text)
            if (formData) {
              form.names = [
                ...form.names,
                ...formData.names
              ]
              // if (formData.flavor_texts !== undefined) {
                //   for (let j = 0; j < formData.flavor_texts.length; j++) {
                  //     const formText = flavorText.find(text => text.form === form.names[0].name)
                  //     if (formText !== undefined) {
                    //       const gameText = formText.entries.find(entry => entry.game === formData.flavor_texts[j].game)
                    //       if (gameText !== undefined) {
                      //         gameText.texts = [
                        //           ...gameText.texts,
                        //           ...formData.flavor_texts[j].texts
                        //         ]
                        //       }
                        //     }
                        //   }
                        // }
                      }
                    }
                  } else if (form.form_type === 'default') {
                    form.names = [
          ...form.names,
          ...otherNames
        ]
      } else {
        let otherFormNames = []
        if (form.form_type === 'alola') {
          otherFormNames = TranslatedFormName.createAlolanNames(otherNames)
        } else if (form.form_type === 'galar') {
          otherFormNames = TranslatedFormName.createGalarianNames(otherNames)
        } else if (form.form_type === 'gmax') {
          otherFormNames = TranslatedFormName.createGigantamaxNames(otherNames)
        } else if (form.form_type === 'hisui') {
          otherFormNames = TranslatedFormName.createHisuianNames(otherNames)
        } else if (form.form_type === 'paldea') {
          otherFormNames = TranslatedFormName.createPaldeanNames(otherNames)
        } else if (form.form_type === 'mega') {
          if (form.names[0]!.text.search(' X') !== -1) {
            otherFormNames = TranslatedFormName.createMegaNames(otherNames, ' X')
          } else if (form.names[0]!.text.search(' Y') !== -1) {
            otherFormNames = TranslatedFormName.createMegaNames(otherNames, ' Y')
          } else {
            otherFormNames = TranslatedFormName.createMegaNames(otherNames, '')
          }
        } else if (form.names[0]!.text.startsWith('Unown ')) {
          otherFormNames = TranslatedFormName.createUnownNames(otherNames, form.names[0]!.text.split(' ')[1]!)
        }
      }
    })
    // let formTypes = types.find(type => type.name === form.form_name)
    // // If the form has the same type as the base form
    // if (formTypes === undefined) {
      //   formTypes = types[0]
      // }
      // form.types = formTypes.types
      // form.base_friendship = baseFriendship
      // form.catch_rate = catchRate
      // let formHeight = height.find(height => height.name === form.form_name)
      // // If the form has the same height as the base form
      // if (formHeight === undefined) {
      //   formHeight = height[0]
      // }
      // form.height = formHeight.height
      // let formWeight = weight.find(weight => weight.name === form.form_name)
      // // If the form has the same weight as the base form
      // if (formWeight === undefined) {
      //   formWeight = weight[0]
      // }
      // form.weight = formWeight.weight
      // form.egg_groups = eggGroups
      // form.gender_rate = genderRatio
      // form.growth_rate = growthRate
      // let formCategory
      // if (category.length === 1) {
      //   formCategory = category[0]
      // } else if (form.form_type === 'default') {
      //   formCategory = category.find(category => category.form === 'default')
      // }
      // if (formCategory === undefined) {
      //   formCategory = category.find(category => category.form === form.form_name)
      //   if (formCategory === undefined) {
      //     formCategory = category.find(category => category.form === form.form_type)
      //     if (formCategory === undefined) {
      //       formCategory = category.find(category => category.form === 'default')
      //       if (formCategory === undefined) {
      //         formCategory = category[0]
      //       }
      //     }
      //   }
      // }
      // form.category = formCategory.categories
      // if (form.form_type === 'default') {
      //   if (flavorText.find(flavorText => flavorText.form === 'default') === undefined) {
      //     console.log(pokemonURL)
      //   }
      //   form.flavor_texts = flavorText.find(flavorText => flavorText.form === 'default').entries
      // } else {
      //   let formFlavorText = flavorText.find(flavorText => flavorText.form === form.names[0].name)
      //   if (formFlavorText === undefined) {
      //     formFlavorText = flavorText.find(flavorText => flavorText.form === form.form_name)
      //     if (formFlavorText === undefined) {
      //       formFlavorText = flavorText.find(flavorText => flavorText.form === 'default')
      //     }
      //   }
      //   if (formFlavorText !== undefined) {
      //     form.flavor_texts = formFlavorText.entries
      //   }
      // }
      // if (form.form_type === 'default') {
      //   if (stats.find(stat => stat.name === 'default') === undefined) {
      //     console.log(form.names[0].name, stats)
      //   }
      //   form.stats = stats.find(stat => stat.name === 'default').stats
      // } else {
      //   let formStats = stats.find(stat => stat.name === form.names[0].name)
      //   if (formStats === undefined) {
      //     formStats = stats.find(stat => stat.name === form.form_name)
      //     if (formStats === undefined) {
      //       formStats = stats.find(stat => stat.name === 'default')
      //     }
      //   }
      //   if (formStats !== undefined) {
      //     form.stats = formStats.stats
      //   }
      // }
      // const defaultFormAbilities = abilityList.filter(ability => ability.form === 'default' || ability.form === pokemons[0].names[0].name)
      // const otherFormAbilities = abilityList.filter(ability => ability.form !== 'default' && ability.form !== pokemons[0].names[0].name)
      // let formAbility = otherFormAbilities.filter(ability => ability.form === form.form_name)
      // // If the form has the same ability as the base form
      // if (formAbility.length === 0) {
      //   formAbility = defaultFormAbilities
      // }
      // form.abilities = formAbility
      // form.types = formTypes.types
      // // Some issues that are easier to fix here than in the data
      // form = fixRandomStuff(form, stats)

    return forms
  }
}
