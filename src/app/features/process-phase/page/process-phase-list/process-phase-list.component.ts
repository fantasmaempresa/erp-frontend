import { Component } from '@angular/core';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { Class2ViewBuilderService } from '../../../../shared/components/dinamyc-views/services/class2-view-builder.service';
import { selectProcessPhase } from '../../../../state/process-phase/processPhase.selector';
import { ProcessPhase } from '../../../../data/models/ProcessPhase.model';
import {
  loadNextPageOfProcessPhase,
  loadProcessPhase,
} from '../../../../state/process-phase/processPhase.actions';

@Component({
  selector: 'app-process-phase-list',
  templateUrl: './process-phase-list.component.html',
  styleUrls: ['./process-phase-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectProcessPhase },
    { provide: CLAZZ, useValue: ProcessPhase },
    { provide: LOAD_ACTION, useValue: loadProcessPhase() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcessPhase },
    Class2ViewBuilderService,
  ],
})
export class ProcessPhaseListComponent {
  selectedItem!: any;

  setSelectedItem = (item: EntityModel) => {
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
      tooltip: 'Editar Fase',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        console.log(item);
      },
      tooltip: 'Eliminar Fase',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}
}
