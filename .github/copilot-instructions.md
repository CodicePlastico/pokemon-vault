# Contesto del progetto

Questo è un repository di esercizio per colloqui tecnici Frontend Developer.
Simula un'app di inventario personale di carte Pokémon (stile Discogs):
l'utente naviga un catalogo e marca le carte come "possedute" o le aggiunge
a una wishlist.

## Stack

- Angular (standalone components)
- Dati di catalogo (carte, statistiche) letti da PokéAPI: https://pokeapi.co/api/v2/
- Dati di possesso/wishlist persistiti su un backend finto locale (json-server),
  in ascolto su http://localhost:3001
- Nessun framework CSS esterno, solo CSS/SCSS nativo

## Struttura cartelle

- `src/app/core` — service HTTP (PokemonService, InventoryService)
- `src/app/features/catalog` — lista e dettaglio carte
- `src/app/features/inventory` — vista "posseduti" e "wishlist"
- `src/app/shared` — componenti riusabili (card, badge, ecc.)
- `db.json` — dati mock per json-server (risorse: `owned`, `wishlist`)

## Convenzioni

- Componenti standalone, niente NgModules
- Chiamate HTTP solo tramite service dedicati, mai direttamente nei componenti
- Uso di `async` pipe nei template, evitare subscribe manuali quando possibile
- Un'interfaccia TypeScript per ogni risorsa dati (`Pokemon`, `OwnedCard`, `WishlistItem`)

## Cosa NON fare

- Non introdurre nuove dipendenze esterne senza necessità
- Non modificare la struttura di `db.json` senza motivo
- Non ottimizzare prematuramente: l'obiettivo è codice chiaro e coerente con l'esistente
