import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../../../core/interfaces';
import { loadMyProjects, selectMyProjects } from '../../../../state/my-project';
import { MyProjectDto, ProcessDto } from '../../../../data/dto';
import { MyProjectsService } from '../../../../data/services';
import { MessageHelper } from 'o2c_core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-start-list',
  templateUrl: './project-start-list.component.html',
  styleUrls: ['./project-start-list.component.scss'],
})
export class ProjectStartListComponent implements OnInit {
  myProjects$!: Observable<Pagination<MyProjectDto> | null>;

  isAdmin: boolean = false;

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
    MessageHelper.showLoading('Iniciando Proyecto...');
    this.myProjectService
      .startProcess({
        projectId: project.id,
        processId: process.id,
        comment: 'Comentario para comenzar este pedo',
      })
      .subscribe({
        next: async () => {
          MessageHelper.getInstanceSwal().close();
          await this.goToCurrentForm(project, process);
        },
        error: async ({ error }) => {
          await MessageHelper.errorMessage(error.error);
        },
      });
  };

  async goToCurrentForm(project: MyProjectDto, process: ProcessDto) {
    await this.router.navigate(['../', project.id, 'process', process.id], {
      relativeTo: this.route,
    });
  }

  async goToResumeProcess(project: MyProjectDto, process: ProcessDto) {
    await this.router.navigate(
      ['../', project.id, 'process', process.id, 'resume'],
      {
        relativeTo: this.route,
      },
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadMyProjects());
    let user = JSON.parse(localStorage.getItem('auth') ?? '[]');
    console.log('useruseruseruser --> ', user);
    if(user.user.role.id == 1) {
      this.isAdmin = true;
    }
  }

  endProject(project: MyProjectDto) {
    console.log('projectproject--> ', project);

    MessageHelper.decisionMessage(
      '¿Estas seguro de finalizar el proyecto?',
      'Si finalizas ahora ya no podrás revertir la operación',
      () => {
        this.myProjectService.finishProject(project.id).subscribe({
          next: (value) => {
            MessageHelper.successMessage(
              'Éxito al finalizar el proyecto',
              'El proyecto fue finalizado con éxito',
            );
            this.ngOnInit();
          },
          error: (err) => {
            console.log('err -->', err);
            MessageHelper.errorMessage(
              'Ocurrio un error al finalizar el proyecto, intente más tarde',
              'Error al finalizar el proyecto',
            );
          },
        });
      },
    );
  }
}
