import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../../data/services/client.service';
import { loadClients, loadClientsSuccess, loadNextPageOfClients } from './clients.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class ClientsEffects {
  constructor(private actions$: Actions, private clientService: ClientService) {}

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadClients),
      mergeMap(() => {
        return this.clientService
          .fetchAll()
          .pipe(map((clients) => loadClientsSuccess({ clients })));
      }),
    );
  });

  loadNextPageOfClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfClients),
      mergeMap(({ page, size }) => {
        return this.clientService
          .changePage(page, size)
          .pipe(map((clients) => loadClientsSuccess({ clients })));
      }),
    );
  });
}
