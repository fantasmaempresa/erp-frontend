import { Component, Injector } from '@angular/core';
import { ClientServiceOld } from '../../../../data/services';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dynamic-views/dynamic-views.module';
import { ClientDto } from '../../../../data/dto';
import {
  loadClients,
  loadNextPageOfClients,
  selectClients,
} from '../../../../state/clients';
import { ListView } from '../../../../core/classes/FormView/ListView';
import { ClientView } from '../../../../data/presentation';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectClients },
    { provide: CLAZZ, useValue: ClientView },
    { provide: LOAD_ACTION, useValue: loadClients() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
  ],
})
export class ClientsListComponent extends ListView<ClientDto> {
  constructor(injector: Injector, private clientService: ClientServiceOld) {
    super(injector, clientService, 'Cliente');
    this.actions = [
      {
        icon: 'people',
        callback: async (item: any) => {
          this.selectedItem = item;
          await this.goToClientsLink();
        },
        isVisible: (item: any) => item.type === 1,
        tooltip: 'Ver Enlaces',
      },
      ...this.actions,
    ];
  }

  goToClientsLink = async () => {
    await this.router.navigate(['../', this.selectedItem.id, 'clientsLink'], {
      relativeTo: this.route,
    });
  };
}
