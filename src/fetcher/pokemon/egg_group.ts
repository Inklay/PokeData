import type { EggGroup } from '../../class/egg_group.ts'

export function getEggGroups ($ : cheerio.Root) : EggGroup[] {
  const eggGroups : EggGroup[] = []
  $('a[title=\'Egg Group\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .children('a')
    .each((__, element) => {
      eggGroups.push($(element).text() as EggGroup)
    })
  return eggGroups
}
