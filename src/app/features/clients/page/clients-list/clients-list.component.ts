import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ClientService } from '../../../../data/services/client.service';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { Store } from '@ngrx/store';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';
import { Client } from '../../../../data/models/Client.model';
import { loadClients, loadNextPageOfClients } from '../../../../state/clients/clients.actions';
import { selectClients } from '../../../../state/clients/clients.selector';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectClients },
    { provide: CLAZZ, useValue: Client },
    { provide: LOAD_ACTION, useValue: loadClients() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
    // { provide: ACTION_KEY, useValue: 'clientId' },
  ],
})
export class ClientsListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private store: Store,
  ) {}

  selectedItem!: any;

  setSelectedItem = (item: EntityModel) => {
    this.selectedItem = item;
  };

  goToEditForm = async () => {
    await this.router.navigate([`../client`], {
      queryParams: { id: this.selectedItem.id },
      relativeTo: this.route,
    });
  };

  goToAddForm = async () => {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  };

  delete = () => {
    MessageHelper.decisionMessage(
      `¿Deseas borrar al cliente ${this.selectedItem.name}?`,
      'Una vez borrado no hay marcha atrás.',
      () => {
        this.clientService.delete(this.selectedItem.id).subscribe({
          next: () => this.store.dispatch(loadClients()),
        });
      },
    );
  };

  goToClientsLink = async () => {
    await this.router.navigate(['../', this.selectedItem.id, 'clientsLink'], {
      relativeTo: this.route,
    });
  };

  actions: ActionsCard[] = [
    {
      icon: 'people',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.goToClientsLink();
      },
      isVisible: (item: any) => {
        return item.type === 1;
      },
      tooltip: 'Ver Enlaces',
    },
    {
      icon: 'edit',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.goToEditForm();
      },
      tooltip: 'Editar Cliente',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        this.selectedItem = item;
        this.delete();
      },
      tooltip: 'Eliminar Cliente',
    },
  ];
}
