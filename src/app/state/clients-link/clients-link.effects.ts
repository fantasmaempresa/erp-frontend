import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  loadClientsLink,
  loadClientsLinkSuccess,
  loadNextPageOfClientsLink,
} from './clients-link.actions';
import { ClientLinkServiceOld } from '../../data/services';

@Injectable()
export class ClientsLinkEffects {
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

  constructor(
    private actions$: Actions,
    private clientLinkService: ClientLinkServiceOld,
  ) {}
}
