import { computed, inject, signal, Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { POKEAPI_BASE_URL } from './api-config';
import { Pokemon, PokemonStat, PokemonSummary } from './models/pokemon.model';

interface PokemonListResponse {
  count: number;
  results: Array<{ name: string; url: string }>;
}

interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
}

export interface PokemonCatalogPage {
  items: PokemonSummary[];
  hasNext: boolean;
  hasPrevious: boolean;
}

const PAGE_SIZE = 24;
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Service()
export class PokemonService {
  private readonly page = signal(0);
  private readonly selectedId = signal<number | null>(null);
  private readonly offset = computed(() => this.page() * PAGE_SIZE);

  readonly currentPage = computed(() => this.page() + 1);

  readonly catalog = httpResource<PokemonCatalogPage>(
    () => ({
      url: `${POKEAPI_BASE_URL}/pokemon`,
      params: { limit: PAGE_SIZE, offset: this.offset() },
    }),
    {
      parse: (response: unknown) => this.toCatalogPage(response as PokemonListResponse),
      defaultValue: { items: [], hasNext: false, hasPrevious: false },
    },
  );

  readonly detail = httpResource<Pokemon>(
    () => {
      const id = this.selectedId();
      return id === null ? undefined : `${POKEAPI_BASE_URL}/pokemon/${id}`;
    },
    {
      parse: (response: unknown) => this.toPokemon(response as PokemonDetailResponse),
    },
  );

  nextPage(): void {
    if (this.catalog.value().hasNext) {
      this.page.update((page) => page + 1);
    }
  }

  previousPage(): void {
    if (this.page() > 0) {
      this.page.update((page) => page - 1);
    }
  }

  setSelectedId(id: number): void {
    this.selectedId.set(id);
  }

  private toCatalogPage(response: PokemonListResponse): PokemonCatalogPage {
    return {
      items: response.results.map(({ name, url }) => {
        const id = Number(url.split('/').filter(Boolean).at(-1));
        return { id, name, imageUrl: `${SPRITE_BASE_URL}/${id}.png` };
      }),
      hasNext: this.offset() + PAGE_SIZE < response.count,
      hasPrevious: this.page() > 0,
    };
  }

  private toPokemon(response: PokemonDetailResponse): Pokemon {
    return {
      id: response.id,
      name: response.name,
      imageUrl: response.sprites.front_default ?? `${SPRITE_BASE_URL}/${response.id}.png`,
      height: response.height,
      weight: response.weight,
      types: response.types.map(({ type }) => type.name),
      stats: response.stats.map(({ base_stat, stat }): PokemonStat => ({
        name: stat.name,
        value: base_stat,
      })),
    };
  }
}
