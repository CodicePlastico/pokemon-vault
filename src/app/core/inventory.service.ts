import { computed, inject, Service } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { INVENTORY_API_URL } from './api-config';
import { OwnedCard } from './models/owned-card.model';

@Service()
export class InventoryService {
  private readonly http = inject(HttpClient);

  readonly owned = httpResource<OwnedCard[]>(() => `${INVENTORY_API_URL}/owned`, {
    defaultValue: [],
  });

  readonly ownedIds = computed(() => new Set(this.owned.value().map((card) => card.id)));

  async addOwned(card: OwnedCard): Promise<void> {
    await firstValueFrom(this.http.post<OwnedCard>(`${INVENTORY_API_URL}/owned`, card));
    this.owned.reload();
  }

  async removeOwned(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${INVENTORY_API_URL}/owned/${id}`));
    this.owned.reload();
  }
}
