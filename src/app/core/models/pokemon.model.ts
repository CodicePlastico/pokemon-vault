export interface PokemonSummary {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon extends PokemonSummary {
  height: number;
  weight: number;
  types: string[];
  stats: PokemonStat[];
}
