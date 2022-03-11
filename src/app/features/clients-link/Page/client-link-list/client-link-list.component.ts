import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadNextPageOfClients } from '../../../../state/clients/clients.actions';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { selectClientsLink } from '../../../../state/clients-link/clients-link.selector';
import { loadClientsLink } from '../../../../state/clients-link/clients-link.actions';
import {
  ACTION_KEY,
  FIELDS,
  LABELS,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';

@Component({
  selector: 'app-client-link-list',
  templateUrl: './client-link-list.component.html',
  styleUrls: ['./client-link-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectClientsLink },
    { provide: LOAD_ACTION, useValue: loadClientsLink },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
    {
      provide: LABELS,
      useValue: ['name', 'email', 'phone', 'rfc', 'profession', 'degree'],
    },
    {
      provide: FIELDS,
      useValue: ['Nombre', 'Correo', 'Teléfono', 'RFC', 'Profesión', 'Grado de Estudios'],
    },
    { provide: ACTION_KEY, useValue: 'clientId' },
  ],
})
export class ClientLinkListComponent {
  selectedItem!: EntityModel;

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

  constructor(private route: ActivatedRoute, private router: Router) {}
}
