import { Component, inject } from '@angular/core';
import { InventoryService } from '../../../core/inventory.service';
import { PokemonCard } from '../../../shared/pokemon-card/pokemon-card';

@Component({
  imports: [PokemonCard],
  templateUrl: './inventory-owned.html',
  styleUrl: './inventory-owned.scss',
})
export default class InventoryOwned {
  protected readonly inventoryService = inject(InventoryService);

  protected async removeOwned(id: number): Promise<void> {
    await this.inventoryService.removeOwned(id);
  }
}
