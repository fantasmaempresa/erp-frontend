import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { loadMyProjects, loadMyProjectsSuccess } from './my-project.actions';
import { MyProjectsService } from '../../data/services/my-projects.service';

@Injectable()
export class MyProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: MyProjectsService,
  ) {}

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMyProjects),
      mergeMap(() => {
        return this.projectService
          .getMyProjects()
          .pipe(map((myProjects) => loadMyProjectsSuccess({ myProjects })));
      }),
    );
  });
}
