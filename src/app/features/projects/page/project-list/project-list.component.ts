import { Component } from '@angular/core';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { selectProjects } from '../../../../state/project/project.selector';
import { loadNextPageOfProjects, loadProjects } from '../../../../state/project/project.actions';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectView } from '../../../../data/Presentation/Project.view';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectProjects },
    { provide: CLAZZ, useValue: ProjectView },
    { provide: LOAD_ACTION, useValue: loadProjects() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProjects },
  ],
})
export class ProjectListComponent {
  selectedItem!: any;

  setSelectedItem = (item: EntityDto) => {
    this.selectedItem = item;
  };

  goToEditForm = async () => {
    await this.router.navigate(['../', this.selectedItem.id], {
      relativeTo: this.route,
    });
  };

  goToAddForm = async () => {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  };

  actions: ActionsCard[] = [
    {
      icon: 'edit',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.goToEditForm();
      },
      tooltip: 'Editar Proyecto',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        console.log(item);
      },
      tooltip: 'Eliminar Proyecto',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}
}
