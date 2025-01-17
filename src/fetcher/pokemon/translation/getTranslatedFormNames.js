export function createAlolanNames (otherNames) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    let name
    switch (otherNames[i].language) {
      case 'fr':
        name = `${otherNames[i].name} d'Alola`
        break
      case 'de':
        name = `${otherNames[i].name} (Alola-Form)`
        break
      case 'it':
        name = `${otherNames[i].name} di Alola`
        break
      case 'es':
        name = `${otherNames[i].name} de Alola`
        break
      case 'zh-Hant':
        name = `阿罗拉${otherNames[i].name}`
        break
      case 'ja':
        name = `${otherNames[i].name}（アローラのすがた）`
        break
      case 'ko':
        name = `${otherNames[i].name}`
        break
    }
    names.push({
      name,
      language: otherNames[i].language
    })
  }
  return names
}

export function createGalarianNames (otherNames) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    let name
    switch (otherNames[i].language) {
      case 'fr':
        name = `${otherNames[i].name} de Galar`
        break
      case 'de':
        name = `${otherNames[i].name} (Galar-Form)`
        break
      case 'it':
        name = `${otherNames[i].name} di Galar`
        break
      case 'es':
        name = `${otherNames[i].name} de Galar`
        break
      case 'zh-Hant':
        name = `伽勒尔${otherNames[i].name}`
        break
      case 'ja':
        name = `${otherNames[i].name}（ガラルのすがた）`
        break
      case 'ko':
        name = `${otherNames[i].name}`
        break
    }
    names.push({
      name,
      language: otherNames[i].language
    })
  }
  return names
}

export function createHisuianNames (otherNames) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    let name
    switch (otherNames[i].language) {
      case 'fr':
        name = `${otherNames[i].name} de Hisui`
        break
      case 'de':
        name = `${otherNames[i].name} (Hisui-Form)`
        break
      case 'it':
        name = `${otherNames[i].name} di Hisui`
        break
      case 'es':
        name = `${otherNames[i].name} de Hisui`
        break
      case 'zh-Hant':
        name = `洗翠${otherNames[i].name}`
        break
      case 'ja':
        name = `${otherNames[i].name}（ヒスイのすがた）`
        break
      case 'ko':
        name = `${otherNames[i].name}`
        break
    }
    names.push({
      name,
      language: otherNames[i].language
    })
  }
  return names
}

export function createGigantamaxNames (otherNames) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    let name
    switch (otherNames[i].language) {
      case 'fr':
        name = `${otherNames[i].name} Gigamax`
        break
      case 'de':
        name = `Gigadynamax-${otherNames[i].name}`
        break
      case 'it':
        name = `${otherNames[i].name} Gigamax`
        break
      case 'es':
        name = `${otherNames[i].name} Gigamax`
        break
      case 'zh-Hant':
        name = `${otherNames[i].name} (超极巨化)`
        break
      case 'ja':
        name = `キョダイマックス・${otherNames[i].name}`
        break
      case 'ko':
        name = `${otherNames[i].name}`
        break
    }
    names.push({
      name,
      language: otherNames[i].language
    })
  }
  return names
}

export function createPaldeanNames (otherNames) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    let name
    switch (otherNames[i].language) {
      case 'fr':
        name = `${otherNames[i].name} de Paldea`
        break
      case 'de':
        name = `${otherNames[i].name} (Paldea-Form)`
        break
      case 'it':
        name = `${otherNames[i].name} di Paldea`
        break
      case 'es':
        name = `${otherNames[i].name} de Paldea`
        break
      case 'zh-Hant':
        name = `帕底亚${otherNames[i].name}`
        break
      case 'ja':
        name = `${otherNames[i].name} (パルデアのすがた)`
        break
      case 'ko':
        name = `${otherNames[i].name}`
        break
    }
    names.push({
      name,
      language: otherNames[i].language
    })
  }
  return names
}

export function createMegaNames (otherNames, extra) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    let name
    switch (otherNames[i].language) {
      case 'fr':
        name = `Mega ${otherNames[i].name}${extra}`
        break
      case 'de':
        name = `Mega-${otherNames[i].name}${extra}`
        break
      case 'it':
        name = `Mega ${otherNames[i].name}${extra}`
        break
      case 'es':
        name = `Mega-${otherNames[i].name}${extra}`
        break
      case 'zh-Hant':
        name = `超级${otherNames[i].name}${extra}`
        break
      case 'ja':
        name = `メガ${otherNames[i].name}${extra}`
        break
      case 'ko':
        name = `${otherNames[i].name}`
        break
    }
    names.push({
      name,
      language: otherNames[i].language
    })
  }
  return names
}

export function createUnownNames (otherNames, extra) {
  const names = []
  for (let i = 0; i < otherNames.length; i++) {
    names.push({
      name: `${otherNames[i].name} ${extra}`,
      language: otherNames[i].language
    })
  }
  return names
}