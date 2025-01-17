export function getGenderRatio ($ : cheerio.Root) {
  let femaleRatio : string = ''
  $('a[title=\'List of Pokémon by gender ratio\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .each((index, element) => {
      const ratioText = $(element).children('td').children('a').children('span').text()
      if ((index === 0 && ratioText !== undefined && ratioText.search('unknown') !== -1) || (index === 1 && femaleRatio === undefined)) {
        femaleRatio = ratioText
      }
    })
  if (femaleRatio === '100% female') {
    return 8
  }
  if (femaleRatio === '12.5% male,87.5% female') {
    return 7
  }
  if (femaleRatio === '25% male,75% female') {
    return 6
  }
  if (femaleRatio === '50% male,50% female') {
    return 4
  }
  if (femaleRatio === '75% male,25% female') {
    return 2
  }
  if (femaleRatio === '87.5% male,12.5% female') {
    return 1
  }
  if (femaleRatio === '100% male') {
    return 0
  }
  if (femaleRatio === 'Gender unknown') {
    return 10
  }
  return -1
}
