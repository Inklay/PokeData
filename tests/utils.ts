import type { Name } from '../src/class/name.ts'

export function testNames (names : Name[] | undefined, pokemonName : string, propertyName : string) {
    console.assert(names !== undefined, `${pokemonName}: ${propertyName} undefined`)
    if (names !== undefined) {
        console.assert(names.length !== 0, `${pokemonName}: ${propertyName} empty`)
        const en = names.find(name => name.language === 'en')
        const fr = names.find(name => name.language === 'fr')
        const de = names.find(name => name.language === 'de')
        const it = names.find(name => name.language === 'it')
        const es = names.find(name => name.language === 'es')
        const ja = names.find(name => name.language === 'ja')
        const zhHant = names.find(name => name.language === 'zh-Hant')
        const ko = names.find(name => name.language === 'ko')

        console.assert(en !== undefined, `${pokemonName}: english ${propertyName} undefined`)
        if (en !== undefined) {
            console.assert(en.text != '', `${pokemonName}: english ${propertyName} empty`)
        }
        console.assert(fr !== undefined, `${pokemonName}: french ${propertyName} undefined`)
        if (fr !== undefined) {
            console.assert(fr.text != '', `${pokemonName}: french ${propertyName} empty`)
        }
        console.assert(de !== undefined, `${pokemonName}: german ${propertyName} undefined`)
        if (de !== undefined) {
            console.assert(de.text != '', `${pokemonName}: german ${propertyName} empty`)
        }
        console.assert(it !== undefined, `${pokemonName}: italian ${propertyName} undefined`)
        if (it !== undefined) {
            console.assert(it.text != '', `${pokemonName}: italian ${propertyName} empty`)
        }
        console.assert(es !== undefined, `${pokemonName}: spanish ${propertyName} undefined`)
        if (es !== undefined) {
            console.assert(es.text != '', `${pokemonName}: spanish ${propertyName} empty`)
        }
        console.assert(ja !== undefined, `${pokemonName}: japanese ${propertyName} undefined`)
        if (ja !== undefined) {
            console.assert(ja.text != '', `${pokemonName}: japanese ${propertyName} empty`)
        }
        console.assert(zhHant !== undefined, `${pokemonName}: chinese ${propertyName} undefined`)
        if (zhHant !== undefined) {
            console.assert(zhHant.text != '', `${pokemonName}: chinese ${propertyName} empty`)
        }
        console.assert(ko !== undefined, `${pokemonName}: korean ${propertyName} undefined`)
        if (ko !== undefined) {
            console.assert(ko.text != '', `${pokemonName}: korean ${propertyName} empty`)
        }
    }
}
