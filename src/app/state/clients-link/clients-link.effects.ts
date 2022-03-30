import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  loadClientsLink,
  loadClientsLinkSuccess,
  loadNextPageOfClientsLink,
} from './clients-link.actions';
import { ClientLinkService } from '../../data/services/client-link.service';

@Injectable()
export class ClientsLinkEffects {
  constructor(private actions$: Actions, private clientLinkService: ClientLinkService) {}

  loadClientsLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadClientsLink),
      mergeMap(({ clientId }) => {
        return this.clientLinkService
          .fetchAllByClientId(clientId)
          .pipe(map((clientsLink) => loadClientsLinkSuccess({ clientsLink })));
      }),
    );
  });

  loadNextPageOfClientsLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfClientsLink),
      mergeMap(({ page, size }) => {
        return this.clientLinkService
          .changePage(page, size)
          .pipe(map((clientsLink) => loadClientsLinkSuccess({ clientsLink })));
      }),
    );
  });
}
