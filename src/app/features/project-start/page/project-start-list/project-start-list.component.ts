import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../../../core/interfaces';
import { loadMyProjects, selectMyProjects } from '../../../../state/my-project';
import { MyProjectDto, ProcessDto } from '../../../../data/dto';
import { MyProjectsService } from '../../../../data/services';

@Component({
  selector: 'app-project-start-list',
  templateUrl: './project-start-list.component.html',
  styleUrls: ['./project-start-list.component.scss'],
})
export class ProjectStartListComponent implements OnInit {
  myProjects$!: Observable<Pagination<MyProjectDto> | null>;

  displayedInfo: { key: keyof MyProjectDto; label: string }[] = [
    {
      label: 'Nombre',
      key: 'name',
    },
    {
      label: 'Descripción',
      key: 'description',
    },
    {
      label: 'Folio',
      key: 'folio',
    },
    {
      label: 'Fecha Estimada',
      key: 'estimate_end_date',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private myProjectService: MyProjectsService,
  ) {
    this.myProjects$ = this.store.select(selectMyProjects);
  }

  startProcess = async (project: MyProjectDto, process: ProcessDto) => {
    // MessageHelper.showLoading('Iniciando Proyecto...');
    // this.myProjectService
    //   .startProcess({
    //     projectId: project.id,
    //     processId: process.id,
    //     comment: 'Comentario para comenzar este pedo',
    //   })
    //   .subscribe({
    //     next: async () => {
    //       MessageHelper.getInstanceSwal().close();
    //       await await this.router.navigate(['./process', process.id], {
    //         relativeTo: this.route,
    //       });
    //     },
    //     error: ({ error }) => {
    //       await MessageHelper.errorMessage(error.error);
    //     },
    //   });
    await this.router.navigate(['../', project.id, 'process', process.id], {
      relativeTo: this.route,
    });
  };

  ngOnInit(): void {
    this.store.dispatch(loadMyProjects());
  }
}
