import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription, tap } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { Client } from '../../../../data/models/Client.model';
import { ClientService } from '../../../../data/services/client.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { Store } from '@ngrx/store';
import {
  emptyClientList,
  loadClients,
  loadNextPageOfClients,
} from '../../../../state/clients/clients.actions';
import { selectClients } from '../../../../state/clients/clients.selector';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'address'];

  selection = new SelectionModel<Client>(false, []);

  dataSource = new MatTableDataSource<Client>();

  clients$!: Observable<Pagination<Client> | null>;

  totalItems = 0;

  pageSize = 10;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  clientSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private store: Store,
  ) {
    this.clients$ = store.select(selectClients);
    store.dispatch(loadClients());
  }

  ngOnInit() {
    this.clientSubscription = this.clients$
      .pipe(
        tap(() => {
          this.isLoadingResults = false;
        }),
      )
      .subscribe((data) => {
        if (data) {
          this.totalItems = data.total;
          this.dataSource = new MatTableDataSource<Client>(data.data);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.store.dispatch(emptyClientList());
    this.clientSubscription.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  async goToNewClient() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../client`], {
      queryParams: { id: this.getSelectedElement().id },
      relativeTo: this.route,
    });
  }

  private getSelectedElement = () => this.selection.selected[0];

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar al cliente ${this.getSelectedElement().name}?`,
      'Una vez borrado no hay marcha atrás.',
      () => {
        this.clientService.delete(this.getSelectedElement().id).subscribe({
          next: () => this.store.dispatch(loadClients()),
        });
      },
    );
  }

  onPaginateChange(event: PageEvent) {
    console.log(event);
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(loadNextPageOfClients({ page, size }));
    // if(this.filterValue == null) {
    //   page = page +1;
    //   this.userService.findAll(page, size).pipe(
    //       map((userData: UserData) => this.dataSource = userData)
    //   ).subscribe();
    // } else {
    //   this.userService.paginateByName(page, size, this.filterValue).pipe(
    //       map((userData: UserData) => this.dataSource = userData)
    //   ).subscribe()
    // }
  }

  async goToClientsLink() {
    await this.router.navigate(['../', this.getSelectedElement().id, 'clientsLink'], {
      relativeTo: this.route,
    });
  }
}
