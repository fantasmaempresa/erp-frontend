import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientDto } from '../../../data/dto/Client.dto';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, tap } from 'rxjs';
import { ClientService } from '../../../data/services/client.service';
import { Pagination } from '../../../core/interfaces/Pagination.model';

export interface TableOptions {
  toolbar: boolean;
  search: boolean;
  pageSize: number;
  paginator: boolean;
}

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss'],
})
export class TableSearchComponent implements OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Input() toolbar = true;

  @Input() pageSize = 10;

  @Input() showPaginator = true;

  @Output() optionSelected = new EventEmitter();

  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'address'];

  selection = new SelectionModel<ClientDto>(false, []);

  dataSource = new MatTableDataSource<ClientDto>();

  dataSource$!: Observable<Pagination<ClientDto>>;

  resultsLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  nextURL!: string;

  prevURL!: string;

  pageIndex = 1;

  optionSelectedSubscription!: Subscription;

  constructor(private clientService: ClientService) {
    this.fetchData();
    this.optionSelectedSubscription = this.selection.changed.subscribe((res) => {
      if (res.added) {
        this.optionSelected.emit(res.added[0]);
      }
    });
  }

  ngOnDestroy() {
    this.optionSelectedSubscription.unsubscribe();
  }

  fetchData() {
    this.dataSource$ = this.clientService.fetchAll();
    this.dataSource$.subscribe(() => {
      this.dataSource.paginator = this.paginator;
    });

    this.updateTable(this.dataSource$);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ClientDto): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.id + 1}`;
  }

  private updateTable(observable$: Observable<any>) {
    observable$
      .pipe(
        tap(() => {
          this.isLoadingResults = false;
        }),
      )
      .subscribe((data: any) => {
        this.pageIndex = data.current_page - 1;
        this.prevURL = data.prev_page_url;
        this.nextURL = data.next_page_url;
        this.resultsLength = data.total;

        this.dataSource.data = data.data;

        this.resultsLength += 1;
        // fix to solve visual bug;
        setTimeout(() => {
          this.resultsLength -= 1;
        });
      });
  }
}
