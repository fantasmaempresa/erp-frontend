import { Component, Injector } from '@angular/core';
import { ClientService } from '../../../../data/services/client.service';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { ClientDto } from '../../../../data/dto/Client.dto';
import {
  loadClients,
  loadNextPageOfClients,
} from '../../../../state/clients/clients.actions';
import { selectClients } from '../../../../state/clients/clients.selectors';
import { ListView } from '../../../../core/classes/FormView/ListView';
import { ClientView } from '../../../../data/presentation/Client.view';

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
  constructor(injector: Injector, private clientService: ClientService) {
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
