import {
  AfterViewInit,
  Component,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, tap } from 'rxjs';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { MemoizedSelector, Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicViewComponent } from '../class/dynamic-view.component';
import { ActivatedRoute } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

interface PopUpData {
  property: string;
  title: string;
  selector: MemoizedSelector<any, any>;
  loadAction?: any;
  loadNextPageAction: (props: { size: number; page: number }) => any;
  actionKey: string;
  inj: Injector;
}

@Component({
  selector: 'app-popup-selector',
  templateUrl: './popup-selector.component.html',
  styleUrls: ['./popup-selector.component.scss'],
})
export class PopupSelectorComponent<T extends EntityModel>
  extends DynamicViewComponent<T>
  implements OnInit, AfterViewInit, OnDestroy
{
  data$!: Observable<Pagination<T> | null>;

  optionsSelected: any[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @ViewChild('checkAll', { static: false }) matCheckAll!: MatCheckbox;

  selection = new SelectionModel<T>(true, []);

  dataSource = new MatTableDataSource<T>();

  isLoadingResults = true;

  pageSize = 5;

  dataSubscription!: Subscription;

  constructor(
    store: Store,
    sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<PopupSelectorComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: PopUpData,
    route: ActivatedRoute,
  ) {
    super(store, route, sanitizer, data.inj);
    this.displayedColumns = ['select', ...this.displayedColumns];
  }

  isAllSelected() {
    const arrayDiff = this.dataSource.data.filter(
      (data: any) => !this.selection.selected.some((select: any) => data.id === select.id),
    );
    return arrayDiff.length === 0;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

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

  setSelectedItem(item: T) {
    this.selection.toggle(item);
    if (this.selection.isSelected(item)) {
      this.addOptions();
    } else {
      this.deleteOptions();
    }

    this.matCheckAll.checked = this.isAllSelected();
    this.addOptions();
  }

  toggleAll() {
    if (this.matCheckAll.checked) {
      this.selection.deselect(...this.selection.selected);
      this.deleteOptions();
    } else {
      this.selection.select(...this.dataSource.data);
      this.addOptions();
    }
  }

  private addOptions() {
    const arrayDiff = this.dataSource.data.filter((data: any) =>
      this.selection.selected.some((select: any) => data.id === select.id),
    );
    arrayDiff.forEach((item) => {
      if (!this.optionsSelected.some((data) => data.id === item.id)) {
        this.optionsSelected.push(item);
      }
    });
  }

  private deleteOptions() {
    const arrayDiff = this.optionsSelected.filter(
      (data: any) => !this.selection.selected.some((select: any) => data.id === select.id),
    );
    arrayDiff.forEach((item) => {
      console.log(item);
    });
  }
}
