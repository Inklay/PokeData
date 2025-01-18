export function getGrowthRate ($ : cheerio.Root) : string {
  let rate
  $('td.roundy > b > a[title=\'Experience\'] > span')
    .each((__, element) => {
      if ($(element).text() !== 'Leveling rate') {
        return
      }
      rate = $(element)
        .parent()
        .parent()
        .next('table')
        .children('tbody')
        .children('tr')
        .children('td')
        .text()
        .replace(' ', '-')
        .toLowerCase()
        .slice(0, -1)
    })
  return rate!
}
