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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, tap } from 'rxjs';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicViewComponent } from '../class/dynamic-view.component';
import { ActivatedRoute } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

interface PopUpMultiData {
  property: string;
  title: string;
  inj: Injector;
}

@Component({
  selector: 'app-popup-multi-selector',
  templateUrl: './popup-multi-selector.component.html',
  styleUrls: ['./popup-multi-selector.component.scss'],
})
export class PopupMultiSelectorComponent<T extends EntityDto>
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

  dataSubscription!: Subscription;

  private isChangingPaginate = false;

  constructor(
    store: Store,
    sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<PopupMultiSelectorComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: PopUpMultiData,
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
          if (this.isChangingPaginate) {
            this.selection.deselect(...this.selection.selected);
            const arraySame = data.data.filter((itemData: any) =>
              this.optionsSelected.some((item: any) => itemData.id === item.id),
            );
            this.selection.select(...arraySame);
            this.matCheckAll.checked = this.isAllSelected();
          }
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
      this.addOptionsSelected();
    } else {
      this.deleteOptionSelected(item);
    }

    this.matCheckAll.checked = this.isAllSelected();
  }

  toggleAll() {
    if (this.matCheckAll.checked) {
      this.selection.selected.forEach((item) => this.deleteOptionSelected(item));
      this.selection.deselect(...this.dataSource.data);
    } else {
      this.selection.select(...this.dataSource.data);
      this.addOptionsSelected();
    }
  }

  private addOptionsSelected() {
    const arrayDiff = this.dataSource.data.filter((data: any) =>
      this.selection.selected.some((select: any) => data.id === select.id),
    );
    arrayDiff.forEach((item) => {
      const dontExist = !this.optionsSelected.find((option) => item.id === option.id);
      if (dontExist) {
        this.optionsSelected.push(item);
      }
    });
  }

  private deleteOptionSelected(item: any) {
    const index = this.optionsSelected.findIndex((option) => item.id === option.id);
    if (!!index || index === 0) {
      this.optionsSelected.splice(index, 1);
    }
  }

  onPaginateChange(event: PageEvent) {
    super.onPaginateChange(event);
    this.isChangingPaginate = true;
  }

  closeDialog() {
    this.dialogRef.close(this.optionsSelected);
  }
}
