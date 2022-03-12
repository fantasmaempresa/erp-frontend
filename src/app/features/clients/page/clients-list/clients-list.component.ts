import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { loadClients, loadNextPageOfClients } from '../../../../state/clients/clients.actions';
import { ClientService } from '../../../../data/services/client.service';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { Store } from '@ngrx/store';
import {
  FIELDS,
  LABELS,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { selectClients } from '../../../../state/clients/clients.selector';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectClients },
    { provide: LOAD_ACTION, useValue: loadClients() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
    {
      provide: FIELDS,
      useValue: ['name', 'email', 'phone', 'rfc'],
    },
    {
      provide: LABELS,
      useValue: ['Nombre', 'Correo', 'Teléfono', 'RFC'],
    },
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

  goToNewClient = async () => {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  };

  goToEditForm = async () => {
    await this.router.navigate([`../client`], {
      queryParams: { id: this.selectedItem.id },
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
      OnClick: async (item: any) => {
        this.selectedItem = item;
        await this.goToClientsLink();
      },
      tooltip: 'Ver Enlaces',
    },
    {
      icon: 'edit',
      OnClick: async (item: any) => {
        this.selectedItem = item;
        await this.goToEditForm();
      },
      tooltip: 'Editar Cliente',
    },
    {
      icon: 'delete',
      OnClick: (item: any) => {
        this.selectedItem = item;
        this.delete();
      },
      tooltip: 'Eliminar Cliente',
    },
  ];
}
