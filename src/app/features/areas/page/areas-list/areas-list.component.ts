import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription, tap } from 'rxjs';
import { Pagination } from '../../../../core/interfaces';
import { AreaService } from '../../../../data/services';
import { WorkAreaDto } from '../../../../data/dto';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { Store } from '@ngrx/store';
import { selectAreas } from '../../../../state/areas/areas.selector';
import {
  emptyAreaList,
  loadAreas,
  loadNextPageOfAreas,
} from '../../../../state/areas/areas.actions';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.scss'],
})
export class AreasListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<WorkAreaDto>(false, []);

  dataSource = new MatTableDataSource<WorkAreaDto>();

  areas$!: Observable<Pagination<WorkAreaDto> | null>;

  areasSubscription!: Subscription;

  totalItems = 0;

  pageSize = 100;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private areaService: AreaService,
    private store: Store,
  ) {
    this.areas$ = store.select(selectAreas);
    store.dispatch(loadAreas());
  }

  ngOnInit(): void {
    this.areasSubscription = this.areas$
      .pipe(tap(() => (this.isLoadingResults = false)))
      .subscribe((data) => {
        if (data) {
          this.totalItems = data.total;
          this.dataSource.data = data.data;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.store.dispatch(emptyAreaList());
    this.areasSubscription.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: WorkAreaDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  async goToNewArea() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../area`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar el area ${this.selection.selected[0].name}?`,
      'Una vez borrada no hay marcha atras.',
      () => {
        this.areaService.delete(this.selection.selected[0].id).subscribe({
          next: () => this.store.dispatch(loadAreas()),
        });
      },
    );
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(loadNextPageOfAreas({ page, size }));
  }
}
