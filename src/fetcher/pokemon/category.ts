import { Name } from '../../class/name.ts'

export class Category {
  public form : string
  public categories : Name[]

  protected constructor (form : string, categories : Name[]) {
    this.form = form
    this.categories = categories
  }

  public static append (a : Category[], b : Category []) {
    b.forEach(category => {
      const alreadyExisting = a.find(x => x.form === category.form)
      if (alreadyExisting !== undefined) {
        alreadyExisting.categories = [
          ...alreadyExisting.categories,
          ...category.categories
        ]
      } else {
        a.push(category)
      }
    })
  }

  private static getFormName (formName : string, baseName : string) : string {
    if (formName === baseName) {
      return 'default'
    }
    if (formName.search('Paldean') !== -1) {
      return 'paldea'
    }
    if (formName.search('Hisuian') !== -1) {
      return 'hisui'
    }
    if (formName.search('Galarian') !== -1) {
      return 'galar'
    }
    if (formName.search('Alolan') !== -1) {
      return 'alola'
    }
    return formName
  }

  public static get ($ : cheerio.Root, baseName : string, data : Category[]) : Category[] {
    const newCategories : Category[] = []
    const categoriesSpan = $('td > a[href=\'/wiki/Pok%C3%A9mon_category\'] > span')
    if ($(categoriesSpan).children('span').length === 0 || $(categoriesSpan).children('span:nth-child(1)').attr('class') === 'explain') {
      newCategories.push(new Category('default', [new Name('en', $(categoriesSpan).text())]))
    } else {
      $(categoriesSpan).children('span').each((__, element) => {
        const form = this.getFormName($(element).attr('title')!, baseName)
        newCategories.push(new Category(form, [new Name('en', `${$(element).text()} Pokémon`)]))
      })
    }
    this.append(data, newCategories)
    return data
  }
}
