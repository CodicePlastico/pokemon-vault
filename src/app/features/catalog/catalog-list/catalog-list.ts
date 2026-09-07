import { Component, inject } from '@angular/core';
import { InventoryService } from '../../../core/inventory.service';
import { PokemonService } from '../../../core/pokemon.service';
import { PokemonSummary } from '../../../core/models/pokemon.model';
import { PokemonCard } from '../../../shared/pokemon-card/pokemon-card';

@Component({
  imports: [PokemonCard],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.scss',
})
export default class CatalogList {
  protected readonly pokemonService = inject(PokemonService);
  protected readonly inventoryService = inject(InventoryService);

  protected async toggleOwned(pokemon: PokemonSummary): Promise<void> {
    if (this.inventoryService.ownedIds().has(pokemon.id)) {
      await this.inventoryService.removeOwned(pokemon.id);
      return;
    }

    await this.inventoryService.addOwned({ ...pokemon, addedAt: new Date().toISOString() });
  }
}
