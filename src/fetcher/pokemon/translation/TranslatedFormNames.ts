import { Name } from '../../../class/name.ts'

export function createAlolanNames (otherNames : Name[]) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    let name: string
    switch (otherName.language) {
      case 'fr':
        name = `${otherName.text} d'Alola`
        break
      case 'de':
        name = `${otherName.text} (Alola-Form)`
        break
      case 'it':
        name = `${otherName.text} di Alola`
        break
      case 'es':
        name = `${otherName.text} de Alola`
        break
      case 'zh-Hant':
        name = `阿罗拉${otherName.text}`
        break
      case 'ja':
        name = `${otherName.text}（アローラのすがた）`
        break
      case 'ko':
        name = `${otherName.text}`
        break
    }
    names.push(new Name(otherName.language, name!))
  })
  return names
}

export function createGalarianNames (otherNames : Name[]) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    let name: string
    switch (otherName.language) {
      case 'fr':
        name = `${otherName.text} de Galar`
        break
      case 'de':
        name = `${otherName.text} (Galar-Form)`
        break
      case 'it':
        name = `${otherName.text} di Galar`
        break
      case 'es':
        name = `${otherName.text} de Galar`
        break
      case 'zh-Hant':
        name = `伽勒尔${otherName.text}`
        break
      case 'ja':
        name = `${otherName.text}（ガラルのすがた）`
        break
      case 'ko':
        name = `${otherName.text}`
        break
    }
    names.push(new Name(otherName.language, name!))
  })
  return names
}

export function createHisuianNames (otherNames : Name[]) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    let name: string
    switch (otherName.language) {
      case 'fr':
        name = `${otherName.text} de Hisui`
        break
      case 'de':
        name = `${otherName.text} (Hisui-Form)`
        break
      case 'it':
        name = `${otherName.text} di Hisui`
        break
      case 'es':
        name = `${otherName.text} de Hisui`
        break
      case 'zh-Hant':
        name = `洗翠${otherName.text}`
        break
      case 'ja':
        name = `${otherName.text}（ヒスイのすがた）`
        break
      case 'ko':
        name = `${otherName.text}`
        break
    }
    names.push(new Name(otherName.language, name!))
  })
  return names
}

export function createGigantamaxNames (otherNames : Name[]) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    let name: string
    switch (otherName.language) {
      case 'fr':
        name = `${otherName.text} Gigamax`
        break
      case 'de':
        name = `Gigadynamax-${otherName.text}`
        break
      case 'it':
        name = `${otherName.text} Gigamax`
        break
      case 'es':
        name = `${otherName.text} Gigamax`
        break
      case 'zh-Hant':
        name = `${otherName.text} (超极巨化)`
        break
      case 'ja':
        name = `キョダイマックス・${otherName.text}`
        break
      case 'ko':
        name = `${otherName.text}`
        break
    }
    names.push(new Name(otherName.language, name!))
  })
  return names
}

export function createPaldeanNames (otherNames : Name[]) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    let name: string
    switch (otherName.language) {
      case 'fr':
        name = `${otherName.text} de Paldea`
        break
      case 'de':
        name = `${otherName.text} (Paldea-Form)`
        break
      case 'it':
        name = `${otherName.text} di Paldea`
        break
      case 'es':
        name = `${otherName.text} de Paldea`
        break
      case 'zh-Hant':
        name = `帕底亚${otherName.text}`
        break
      case 'ja':
        name = `${otherName.text} (パルデアのすがた)`
        break
      case 'ko':
        name = `${otherName.text}`
        break
    }
    names.push(new Name(otherName.language, name!))
  })
  return names
}

export function createMegaNames (otherNames : Name[], extra : string) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    let name: string
    switch (otherName.language) {
      case 'fr':
        name = `Mega ${otherName.text}${extra}`
        break
      case 'de':
        name = `Mega-${otherName.text}${extra}`
        break
      case 'it':
        name = `Mega ${otherName.text}${extra}`
        break
      case 'es':
        name = `Mega-${otherName.text}${extra}`
        break
      case 'zh-Hant':
        name = `超级${otherName.text}${extra}`
        break
      case 'ja':
        name = `メガ${otherName.text}${extra}`
        break
      case 'ko':
        name = `${otherName.text}`
        break
    }
    names.push(new Name(otherName.language, name!))
  })
  return names
}

export function createUnownNames (otherNames : Name[], extra : string) : Name[] {
  const names : Name[] = []
  otherNames.forEach(otherName => {
    names.push(new Name(otherName.language, `${otherName.text} ${extra}`))
  })
  return names
}
