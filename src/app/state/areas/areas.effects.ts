import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AreaService } from '../../data/services/area.service';
import {
  loadAreas,
  loadAreasSuccess,
  loadNextPageOfAreas,
} from './areas.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class AreasEffects {
  loadAreas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAreas),
      mergeMap(() => {
        return this.areaService
          .fetchAll()
          .pipe(map((areas) => loadAreasSuccess({ areas })));
      }),
    );
  });

  loadNextPageOfAreas = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfAreas),
      mergeMap(({ page, size }) => {
        return this.areaService
          .changePage(page, size)
          .pipe(map((areas) => loadAreasSuccess({ areas })));
      }),
    );
  });

  constructor(private actions$: Actions, private areaService: AreaService) {}
}
