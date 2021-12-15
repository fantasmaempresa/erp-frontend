import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Client } from '../../../../data/models/Client.model';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, switchMap, tap } from 'rxjs';
import { Pagination } from '../../../../data/models/Pagination.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { Concept } from '../../../../data/models/Concept.model';
import { ConceptService } from '../../../../data/services/concept.service';

@Component({
  selector: 'app-concept-list',
  templateUrl: './concept-list.component.html',
  styleUrls: ['./concept-list.component.scss'],
})
export class ConceptListComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description', 'amount'];

  selection = new SelectionModel<Concept>(false, []);

  dataSource = new MatTableDataSource<Concept>();

  dataSource$!: Observable<Pagination<Concept>>;

  resultsLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  nextURL!: string;

  prevURL!: string;

  pageIndex = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private conceptService: ConceptService,
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
      switchMap(() => this.conceptService.changePage(url)),
    );
    this.updateTable(paginator$);
  }

  fetchData() {
    this.dataSource$ = this.conceptService.fetchAll();
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
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  async goToNewClient() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../concept`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar el concepto ${this.selection.selected[0].name}?`,
      'Una vez borrado no hay marcha atras.',
      () => {
        this.conceptService.delete(this.selection.selected[0].id).subscribe({
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
