import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ClientServiceOld } from '../../data/services/client.service';

@Injectable()
export class ClientsEffects {
  // loadClients$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadClients),
  //     mergeMap(() => {
  //       return this.clientService
  //         .fetchAll()
  //         .pipe(map((clients) => loadClientsSuccess({ clients })));
  //     }),
  //   );
  // });

  // loadNextPageOfClients$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadNextPageOfClients),
  //     mergeMap(({ page, size }) => {
  //       return this.clientService
  //         .changePage(page, size)
  //         .pipe(map((clients) => loadClientsSuccess({ clients })));
  //     }),
  //   );
  // });

  constructor(
    private actions$: Actions,
    private clientService: ClientServiceOld,
  ) {}
}
