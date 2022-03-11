import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, tap } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { DynamicViewComponent } from '../class/dynamic-view.component';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { MemoizedSelector, Store } from '@ngrx/store';
import {
  ACTION_KEY,
  FIELDS,
  LABELS,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../dynamic-views.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent<T extends EntityModel>
  extends DynamicViewComponent<T>
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Output()
  selectedItem = new EventEmitter<T>();

  selection = new SelectionModel<T>(false, []);

  dataSource = new MatTableDataSource<T>();

  totalItems = 0;

  pageSize = 10;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  dataSubscription!: Subscription;

  constructor(
    store: Store,
    @Inject(SELECTOR) selector: MemoizedSelector<any, any>,
    @Inject(LOAD_ACTION) loadAction: any,
    @Inject(LOAD_NEXT_ACTION) loadNextPageAction: (props: { size: number; page: number }) => any,
    @Inject(FIELDS)
    public displayedColumns: string[],
    @Inject(LABELS)
    public labels: string[],
    @Optional()
    @Inject(ACTION_KEY)
    actionKey: string,
    route: ActivatedRoute,
  ) {
    super(
      store,
      selector,
      loadAction,
      loadNextPageAction,
      displayedColumns,
      labels,
      actionKey,
      route,
    );
    this.displayedColumns = ['select', ...displayedColumns];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  getSelectedElement = () => this.selection.selected[0];

  ngOnInit(): void {
    this.dataSubscription = this.data$
      .pipe(
        tap(() => {
          this.isLoadingResults = false;
        }),
      )
      .subscribe((data: Pagination<T> | null) => {
        if (data) {
          this.totalItems = data.total;
          this.dataSource = new MatTableDataSource<T>(data.data);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(this.loadNextPageAction({ size, page }));
  }

  setSelectedItem(item: T) {
    this.selection.toggle(item);
    if (this.selection.isSelected(item)) {
      this.selectedItem.emit(item);
    } else {
      this.selectedItem.emit(undefined);
    }
  }
}
