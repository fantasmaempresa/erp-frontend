import { Component } from '@angular/core';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dynamic-views/dynamic-views.module';
import { selectProjects } from '../../../../state/project/project.selectors';
import {
  loadNextPageOfProjects,
  loadProjects,
} from '../../../../state/project/project.actions';
import { EntityDto } from 'o2c_core';
import { ActionsCard } from '../../../../shared/components/dynamic-views/card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectView } from '../../../../data/presentation/Project.view';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  setSelectedItem = (item: EntityDto) => {
    this.selectedItem = item;
  };

  goToEditForm = async () => {
    await this.router.navigate(['../', this.selectedItem.id], {
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

  goToAddForm = async () => {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  };
}
