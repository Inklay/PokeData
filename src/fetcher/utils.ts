import type { language, languageCode } from '../class/language.ts'
import { Name } from '../class/name.ts'

function getLanguageCode (languageName : language) : languageCode | undefined {
  switch (languageName) {
    case 'Mandarin Chinese':
    case 'Mandarin':
      return 'zh-Hant'
    case 'French':
      return 'fr'
    case 'German':
      return 'de'
    case 'Italian':
      return 'it'
    case 'Korean':
      return 'ko'
    case 'Spanish':
      return 'es'
    case 'Japanese':
      return 'ja'
  }
}

export function getOtherNames ($ : cheerio.Root, isPokemon : Boolean) : Name[] {
  const data : Name[] = []
  let elem = $('span#In_other_languages')
    .parent()
    .next('table')
  if ($(elem).attr('align') === 'center' || $(elem).attr('width') === '75%') {
    elem = $(elem).next('table')
  }
  $(elem)
    .children('tbody')
    .children('tr')
    .children('td')
    .children('table')
    .children('tbody')
    .children('tr')
    .each((rowIndex, row) => {
      let language : languageCode | undefined
      if (rowIndex === 0) {
        return
      }
      $(row).children('td').each((colIndex, col) => {
        if (!isPokemon) {
          if ($(col).attr('rowspan') === '2') {
            return
          }
          // Other languages
          if (colIndex === 0 && ($(col).attr('colspan') === '2')) {
            language = getLanguageCode($('a:nth-child(2)', col).text() as language)
          }
          // Madarin
          if (colIndex === 0 && $(col).children('span').length !== 0) {
            language = getLanguageCode($(col).text().replace('\n', '') as language)
          }
          if (colIndex === 1 && rowIndex !== 1 && language !== undefined) {
            let text = $(col).contents().first().text().replace('\n', '')
            const index = text.search(' / ')
            if (index !== -1) {
              text = text.slice(0, index)
            }
            if (language !== undefined) {
              data.push(new Name(language, text))
            }
          }
        } else {
          if (colIndex === 0) {
            // Japanese
            if ($(col).children('a').length !== 2) {
              language = getLanguageCode($(col).text().replaceAll(' ', '').replace('\n', '') as language)
            } else {
              language = getLanguageCode($('a:nth-child(2)', col).text() as language)
            }
          }
          if (colIndex === 1 && language !== undefined) {
            let text = $(col).contents().first().text().replace('\n', '')
            if (language === 'zh-Hant') {
              const index = text.search(' / ')
              if (index !== -1) {
                text = text.slice(0, index)
              }
            }
            if (language !== undefined) {
              data.push(new Name(language, text))
            }
          }
        }
      })
    })
  return data
}

export function isVisible ($ : cheerio.Root, element : cheerio.Element) {
  if ($(element).attr('style') === undefined) {
    return true
  }
  if ($(element).attr('style')!.search('display:none') !== -1) {
    return false
  }
  if ($(element).attr('style')!.search('display: none') !== -1) {
    return false
  }
  return true
}

export function NaNToMinusOne (value : number) {
  if (isNaN(value)) {
    return -1
  }
  return value
}
