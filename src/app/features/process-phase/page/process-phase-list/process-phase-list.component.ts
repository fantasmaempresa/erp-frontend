import { Component } from '@angular/core';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { selectProcessPhase } from '../../../../state/process-phase/processPhase.selector';
import {
  loadNextPageOfProcessPhase,
  loadProcessPhase,
} from '../../../../state/process-phase/processPhase.actions';
import { ProcessPhaseView } from '../../../../data/presentation/ProcessPhase.view';

@Component({
  selector: 'app-process-phase-list',
  templateUrl: './process-phase-list.component.html',
  styleUrls: ['./process-phase-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectProcessPhase },
    { provide: CLAZZ, useValue: ProcessPhaseView },
    { provide: LOAD_ACTION, useValue: loadProcessPhase() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfProcessPhase },
  ],
})
export class ProcessPhaseListComponent {
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
