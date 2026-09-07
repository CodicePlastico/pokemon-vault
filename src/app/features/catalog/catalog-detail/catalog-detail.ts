import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../../core/inventory.service';
import { PokemonService } from '../../../core/pokemon.service';
import { Pokemon } from '../../../core/models/pokemon.model';

@Component({
  imports: [RouterLink],
  templateUrl: './catalog-detail.html',
  styleUrl: './catalog-detail.scss',
})
export default class CatalogDetail {
  readonly id = input.required<string>();

  protected readonly pokemonService = inject(PokemonService);
  protected readonly inventoryService = inject(InventoryService);

  constructor() {
    effect(() => {
      const id = Number(this.id());
      if (Number.isInteger(id) && id > 0) {
        this.pokemonService.setSelectedId(id);
      }
    });
  }

  protected async toggleOwned(pokemon: Pokemon): Promise<void> {
    if (this.inventoryService.ownedIds().has(pokemon.id)) {
      await this.inventoryService.removeOwned(pokemon.id);
      return;
    }

    await this.inventoryService.addOwned({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      addedAt: new Date().toISOString(),
    });
  }

  protected formatName(name: string): string {
    return name.replaceAll('-', ' ');
  }
}
