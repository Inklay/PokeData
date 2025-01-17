enum languageEnum {
  'Mandarin Chinese',
  'Mandarin',
  'French',
  'German',
  'Italian',
  'Korean',
  'Spanish',
  'Japanese',
  'English'
}

enum languageCodeEnum {
  'zh-Hant',
  'fr',
  'de',
  'it',
  'ko',
  'es',
  'ja',
  'en'
}

export type language = keyof typeof languageEnum
export type languageCode = keyof typeof languageCodeEnum
