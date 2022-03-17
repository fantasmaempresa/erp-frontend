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
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  MAP_TO_FIELDS,
  SELECTOR,
} from '../dynamic-views.module';
import { ActivatedRoute } from '@angular/router';
import { Class2ViewBuilderService } from '../services/class2-view-builder.service';

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

  isLoadingResults = true;

  dataSubscription!: Subscription;

  constructor(
    store: Store,
    @Inject(SELECTOR) selector: MemoizedSelector<any, any>,
    @Inject(LOAD_ACTION) loadAction: any,
    @Inject(LOAD_NEXT_ACTION) loadNextPageAction: (props: { size: number; page: number }) => any,
    @Optional()
    @Inject(ACTION_KEY)
    actionKey: string,
    @Optional()
    @Inject(MAP_TO_FIELDS)
    mapToFields: any,
    route: ActivatedRoute,
    class2View: Class2ViewBuilderService,
  ) {
    super(
      store,
      selector,
      loadAction,
      loadNextPageAction,
      actionKey,
      mapToFields,
      route,
      class2View,
    );
    this.displayedColumns = ['select', ...this.displayedColumns];
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
