import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { ProjectService } from '../../data/services/project.service';
import { loadNextPageOfProjects, loadProjects, loadProjectsSuccess } from './project.actions';

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private projectService: ProjectService) {}

  loadClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProjects),
      mergeMap(() => {
        return this.projectService
          .fetchAll()
          .pipe(map((projects) => loadProjectsSuccess({ projects })));
      }),
    );
  });

  loadNextPageOfClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNextPageOfProjects),
      mergeMap(({ page, size }) => {
        return this.projectService
          .changePage(page, size)
          .pipe(map((projects) => loadProjectsSuccess({ projects })));
      }),
    );
  });
}