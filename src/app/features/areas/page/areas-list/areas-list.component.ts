import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, switchMap, tap } from 'rxjs';
import { Pagination } from '../../../../data/models/Pagination.model';
import { AreaService } from '../../../../data/services/area.service';
import { WorkArea } from '../../../../data/models/WorkArea.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.scss'],
})
export class AreasListComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<WorkArea>(false, []);

  dataSource = new MatTableDataSource<WorkArea>();

  dataSource$!: Observable<Pagination<WorkArea>>;

  resultsLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  nextURL!: string;

  prevURL!: string;

  pageIndex = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private areaService: AreaService,
  ) {
    this.fetchData();
  }

  ngAfterViewInit() {
    let url = '';
    const paginator$ = this.paginator.page?.pipe(
      tap(({ pageIndex, previousPageIndex }) => {
        if (previousPageIndex !== undefined && pageIndex > previousPageIndex) {
          url = this.nextURL;
        } else {
          url = this.prevURL;
        }
        this.isLoadingResults = true;
      }),
      switchMap(() => this.areaService.changePage(url)),
    );
    this.updateTable(paginator$);
  }

  fetchData() {
    this.dataSource$ = this.areaService.fetchAll();
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
  checkboxLabel(row?: WorkArea): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
          next: () => this.fetchData(),
        });
      },
    );
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
