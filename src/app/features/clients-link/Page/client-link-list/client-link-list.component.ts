import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HEADERS,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
  TABLE_FIELDS,
} from '../../../../shared/components/generic-table/generic-table.component';
import { selectClients } from '../../../../state/clients/clients.selector';
import { loadClients, loadNextPageOfClients } from '../../../../state/clients/clients.actions';

@Component({
  selector: 'app-client-link-list',
  templateUrl: './client-link-list.component.html',
  styleUrls: ['./client-link-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectClients },
    { provide: LOAD_ACTION, useValue: loadClients() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfClients },
    { provide: HEADERS, useValue: ['select', 'name', 'email', 'phone'] },
    { provide: TABLE_FIELDS, useValue: ['Nombre', 'Correo', 'Teléfono'] },
  ],
})
export class ClientLinkListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async goToNewClientLink() {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  }
}
