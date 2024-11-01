import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { ProjectActionEventService } from 'src/app/data/services/project-action-event.service';
import { Pagination } from '../../../../core/interfaces';
import { CommandProjectDto, MyProjectDto, ProcessDto } from '../../../../data/dto';
import { MyProjectsService } from '../../../../data/services';
import { loadMyProjects, selectMyProjects } from '../../../../state/my-project';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
@AutoUnsubscribe()
@Component({
  selector: 'app-project-start-list',
  templateUrl: './project-start-list.component.html',
  styleUrls: ['./project-start-list.component.scss'],
})
export class ProjectStartListComponent implements OnInit, OnDestroy {
  myProjects$!: Observable<Pagination<MyProjectDto> | null>;

  isAdmin: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private myProjectService: MyProjectsService,
    private _socket: ProjectActionEventService,
  ) {
    this.myProjects$ = this.store.select(selectMyProjects);
    const inRoute = this.route.snapshot.url.map(segment => segment.path).join('/');
    console.log(inRoute);
    this._socket.action$.subscribe((action: CommandProjectDto) => {
      console.log('action ---> ', action);
      if (action.action.command == 'reload_my_project' && inRoute == 'list') {
        if (action.action.action == 'create_project' || action.action.action == 'startProject' || action.action.action == 'finishProject') {
          this.ngOnInit();
        }
      }
    },
    );
  }
  ngOnDestroy(): void { }

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
    if (user.user.role.id == 1) {
      this.isAdmin = true;
    }

    // this.socket$.action$.subscribe((action) => {
    //   console.log('actionactionaction --> ', action);
    // });
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
