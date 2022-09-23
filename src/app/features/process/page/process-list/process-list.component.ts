import { Component } from '@angular/core';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { selectProcess } from '../../../../state/process/process.selector';
import {
  loadNextPageOfProcess,
  loadProcess,
} from '../../../../state/process/process.actions';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessView } from '../../../../data/presentation/Process.view';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectProcess },
    { provide: CLAZZ, useValue: ProcessView },
    { provide: LOAD_ACTION, useValue: loadProcess() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcess },
  ],
})
export class ProcessListComponent {
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
      tooltip: 'Editar Proceso',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        console.log(item);
      },
      tooltip: 'Eliminar Proceso',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}
}
