enum PokedexEnum {
	'NAT',
	'RBY',
	'GSC',
	'FRLG',
	'RSE',
	'Ground',
	'DP',
	'Pt',
	'HGSS',
	'BW',
	'B2W2',
	'XYCentral',
	'XYCoastal',
	'XYMountain',
	'ORAS',
	'SM',
	'USUM',
	'LGPE',
	'SWSH',
	'IOA',
	'CT',
	'BDSP',
	'LPA',
	'SV',
	'TTM',
	'BA'
}
  
export type Pokedex = keyof typeof PokedexEnum
  