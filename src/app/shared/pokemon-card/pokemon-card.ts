import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonSummary } from '../../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCard {
  readonly pokemon = input.required<PokemonSummary>();
  readonly isOwned = input(false);
  readonly toggleOwned = output<void>();

  protected formatName(name: string): string {
    return name.replaceAll('-', ' ');
  }
}
