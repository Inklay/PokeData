import { load } from 'cheerio'
import { Name } from '../../../class/name.ts'

export class TranslatedCategory {
  public form : string
  public categories : Name[]

  public constructor (form : string, categories : Name[]) {
    this.form = form
    this.categories = categories
  }

  static async getTranslation ($ : cheerio.Root, name : Name) : Promise<TranslatedCategory[]> {
    switch (name.language) {
      case 'fr':
        return await this.getFR($, name)
      case 'de':
        return this.getDE($)
      case 'it':
        return this.getIT($)
      case 'es':
        return await this.getES($, name)
      case 'ja':
        return this.getJA($)
      case 'zh-Hant':
        return this.getZHHANT($)
      case 'ko':
        return this.getKO($)
    }
    return []
  }

  private static async getFR ($ : cheerio.Root, name : Name) : Promise<TranslatedCategory[]> {
    const data : TranslatedCategory[] = []
    const element = $('a[title=\'Catégorie\']').parent().next('td')
    let defaultCategory = ''

    if (element.length !== 0 ) {
      defaultCategory = $('a[title=\'Catégorie\']').parent().next('td').text()  
    } else {
      $('a[title=\'Catégorie\']').parent().parent().next().children('td').each((index, value) => {
        if (index === 0) {
          defaultCategory = $(value).children('a').next().text().substring(1)
        } else {
          const formName = $(value).children('small').children('i').text()
          let form = ''

          if (formName === '(Hoopa Enchaîné)') {
            form = ''
          }
        }
      })
    }
    data.push(new TranslatedCategory('default', [new Name('fr', defaultCategory)]))

    if ($(`a[title='${name.text} de Paldea']`).length !== 0) {
      const URL = `https://www.pokepedia.fr/${name.text}_de_Paldea`
      const pageHTML = await (await fetch(URL)).text()
      const $paldea = load(pageHTML)
      const category = $paldea('a[title=\'Catégorie\']').parent().next('td').text()
      if (category !== defaultCategory) {
        data.push(new TranslatedCategory('paldea', [new Name('fr', category)]))
      }
    }

    if ($(`a[title='${name.text} de Hisui']`).length !== 0) {
      const URL = `https://www.pokepedia.fr/${name.text}_de_Hisui`
      const pageHTML = await (await fetch(URL)).text()
      const $hisui = load(pageHTML)
      const category = $hisui('a[title=\'Catégorie\']').parent().next('td').text()
      if (category !== defaultCategory) {
        data.push(new TranslatedCategory('hisui', [new Name('fr', category)]))
      }
    }

    if ($(`a[title='${name.text} de Galar']`).length !== 0) {
      const URL = `https://www.pokepedia.fr/${name.text}_de_Galar`
      const pageHTML = await (await fetch(URL)).text()
      const $galar = load(pageHTML)
      const category = $galar('a[title=\'Catégorie\']').parent().next('td').text()
      if (category !== defaultCategory) {
        data.push(new TranslatedCategory('galar', [new Name('fr', category)]))
      }
    }

    return data
  }
  
  private static getDE ($ : cheerio.Root) : TranslatedCategory[] {
    const data : TranslatedCategory[] = []
    const categoryElement = $('a[title=\'Kategorie (Pokémoneigenschaft)\']').parent().next('td')
    if ($(categoryElement).children('br').length === 0) {
      data.push(new TranslatedCategory('default', [new Name('de', $(categoryElement).text())]))
    } else {
      let form: string
      let category: string
      $(categoryElement).contents().each((index, value) => {
        const text = $(value).text().replace('\n', '')
        if (index % 2 === 0) {
          category = text
        } else {
          if (text === '') {
            form = 'default'
          } else if (text === '(Hisui)') {
            form = 'hisui'
          } else if (text === '(Paldea)') {
            form = 'paldea'
          } else if (text === '(Galar)') {
            form = 'galar'
          }
          data.push(new TranslatedCategory(form, [new Name('de', category)]))
        }
      })
    }
    return data
  }
  
  private static async getES ($ : cheerio.Root, name : Name) : Promise<TranslatedCategory[]> {
    const data : TranslatedCategory[] = []
    const defaultCategory = $('a[title=\'Categoría\']').parent().next('td').text().replaceAll('\n', '')
    data.push(new TranslatedCategory('default', [new Name('es', defaultCategory)]))
    if ($(`a[title='${name.text.replace('\'', '%27')} de Paldea']`).length !== 0) {
      const URL = `https://www.wikidex.net/wiki/${name.text}_de_Paldea`
      const pageHTML = await (await fetch(URL)).text()
      const $paldea = load(pageHTML)
      const category = $paldea('a[title=\'Categoría\']').parent().next('td').text()
      if (category !== defaultCategory) {
        data.push(new TranslatedCategory('paldea', [new Name('es', category)]))
      }
    }
    if ($(`a[title='${name.text.replace('\'', '%27')} de Hisui']`).length !== 0) {
      const URL = `https://www.pokepedia.fr/${name.text}_de_Hisui`
      const pageHTML = await (await fetch(URL)).text()
      const $hisui = load(pageHTML)
      const category = $hisui('a[title=\'Categoría\']').parent().next('td').text()
      if (category !== defaultCategory) {
        data.push(new TranslatedCategory('hisui', [new Name('es', category)]))
      }
    }
    if ($(`a[title='${name.text.replace('\'', '%27')} de Galar']`).length !== 0) {
      const URL = `https://www.pokepedia.fr/${name.text}_de_Galar`
      const pageHTML = await (await fetch(URL)).text()
      const $galar = load(pageHTML)
      const category = $galar('a[title=\'Categoría\']').parent().next('td').text()
      if (category !== defaultCategory) {
        data.push(new TranslatedCategory('galar', [new Name('es', category)]))
      }
    }
    return data
  }
  
  private static getIT ($ : cheerio.Root) : TranslatedCategory[] {
    const data : TranslatedCategory[] = []
    const categories = $('a[title=\'Categoria\']').first().parent().text().split(')')
    if (categories.length === 1) {
      data.push(new TranslatedCategory('default', [new Name('it', categories[0]!)]))
    } else {
      let form = 'default'
      for (let i = 0; i < categories.length; i++) {
        if (categories[i] === '') {
          break
        }
        const category = categories[i]!.split('(')
        if (category[1] === 'Forma di Hisui') {
          form = 'hisui'
        } else if (category[1] === 'Forma di Galar') {
          form = 'galar'
        } else if (category[1] === 'Forma di Paldea') {
          form = 'paldea'
        }
        data.push(new TranslatedCategory(form, [new Name('it', category[0]!)]))
      }
    }
    return data
  }
  
  private static getJA ($ : cheerio.Root) : TranslatedCategory[] {
    const data : TranslatedCategory[] = []
    let defaultCategory: string
    $('table[class=\'blueinfobox\'] > tbody tr > th:contains("分類")').each((index, value) => {
      let form = 'default'
      const name = $(value).next().text().replaceAll('\n', '')
      if (index === 0) {
        defaultCategory = name
      } else {
        const headerContent = $(value).parent().prev().text().replaceAll('\n', '')
        if (headerContent === 'ヒスイのすがた') {
          form = 'hisui'
        } else if (headerContent === 'ガラルのすがた') {
          form = 'galar'
        } else if (headerContent === 'パルデアのすがた') {
          form = 'paldea'
        }
      }
      if (form === 'default' || name !== defaultCategory) {
        data.push(new TranslatedCategory(form, [new Name('ja', name)]))
      }
    })
    return data
  }
  
  private static getZHHANT ($ : cheerio.Root) : TranslatedCategory[] {
    const data : TranslatedCategory[] = []
    let defaultCategory: string
    const formContainer = $('tr[class=\'md-hide\']')
    const formName : string[] = []
    $(formContainer).each((index, value) => {
      if (index === 0) {
        formName.push('default')
        return
      }
      const form = $(value).text().trim().replace('\n', '')
      if (form.search('洗翠') !== -1) {
        formName.push('hisui')
      } else if (form.search('帕底亚') !== -1) {
        formName.push('paldea')
      } else if (form.search('伽勒尔') !== -1) {
        formName.push('galar')
      }
    })
    $('a[title=\'分类\']').each((index, value) => {
      if (index >= formContainer.length) {
        return
      }
      const name = $(value).parent().next().text().trim().replace('\n', '')
      if (index === 0) {
        defaultCategory = name
      }
      if (name !== defaultCategory || index === 0) {
        data.push(new TranslatedCategory(formName[index]!, [new Name('zh-Hant', name)]))
      }
    })
    return data
  }

  private static getKO ($ : cheerio.Root) : TranslatedCategory[] {
    const data : TranslatedCategory[] = []
    const forms : string[] = []

    $('table#pokemonToggle > tbody > tr').each((index, value) => {
      // This is the table name
      if (index === 0) {
        return
      }
      forms.push($(value).children('td').children('a').children('span').text())
    })

    $('div.infobox-pokemon > table.body > tbody > tr:nth-child(2) > td:nth-child(2)').each((index, value) => {
      let form = 'default'
      if (index !== 0) {
        if (forms[index]?.search('가라르') !== -1) {
          form = 'galar'
        } else if (forms[index]?.search('히스이') !== -1) {
          form = 'hisui'
        } else if (forms[index]?.search('팔데아') !== -1) {
          form = 'paldea'
        }
      }
      data.push(new TranslatedCategory(form, [new Name('ko', $(value).text().replaceAll('\n', ''))]))
    })
    return data
  }
}
