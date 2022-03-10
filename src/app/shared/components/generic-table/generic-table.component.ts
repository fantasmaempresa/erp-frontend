import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, tap } from 'rxjs';
import { Pagination } from '../../../core/interfaces/Pagination.model';
import { EntityModel } from '../../../core/interfaces/EntityModel';
import { MemoizedSelector, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const SELECTOR = new InjectionToken<MemoizedSelector<any, any>>('selector');
export const LOAD_ACTION = new InjectionToken<TypedAction<any>>('load_action');
export const LOAD_NEXT_ACTION = new InjectionToken<(props: { size: number; page: number }) => any>(
  'load_next_action',
);
export const HEADERS = new InjectionToken<string[]>('headers');
export const TABLE_FIELDS = new InjectionToken<string[]>('table_fields');

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<T extends EntityModel>
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Output()
  selectedItem = new EventEmitter<T>();

  selection = new SelectionModel<T>(false, []);

  dataSource = new MatTableDataSource<T>();

  data$!: Observable<Pagination<T> | null>;

  totalItems = 0;

  pageSize = 10;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  dataSubscription!: Subscription;

  constructor(
    private store: Store,
    @Inject(SELECTOR) private selector: MemoizedSelector<any, any>,
    @Inject(LOAD_ACTION) private loadAction: TypedAction<any>,
    @Inject(LOAD_NEXT_ACTION)
    private loadNextPageAction: (props: { size: number; page: number }) => any,
    @Inject(HEADERS) public displayedColumns: string[],
    @Inject(TABLE_FIELDS) public fields: string[],
  ) {
    this.data$ = store.select(selector);
    store.dispatch(loadAction);
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
