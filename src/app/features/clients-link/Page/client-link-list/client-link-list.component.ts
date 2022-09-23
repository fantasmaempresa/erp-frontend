import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import { selectClientsLink } from '../../../../state/clients-link/clients-link.selector';
import {
  loadClientsLink,
  loadNextPageOfClientsLink,
} from '../../../../state/clients-link/clients-link.actions';
import {
  ACTION_KEY,
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dynamic-views/dynamic-views.module';
import { ActionsCard } from '../../../../shared/components/dynamic-views/card-view/card-view.component';
import { ClientLinkView } from '../../../../data/presentation/ClientLink.view';

@Component({
  selector: 'app-client-link-list',
  templateUrl: './client-link-list.component.html',
  styleUrls: ['./client-link-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectClientsLink },
    { provide: CLAZZ, useValue: ClientLinkView },
    { provide: LOAD_ACTION, useValue: loadClientsLink },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClientsLink },
    { provide: ACTION_KEY, useValue: 'clientId' },
  ],
})
export class ClientLinkListComponent {
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
      tooltip: 'Editar Enlace',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        console.log(item);
      },
      tooltip: 'Eliminar Enlace',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  async back() {
    await this.router.navigate(['../../../'], { relativeTo: this.route });
  }
}
