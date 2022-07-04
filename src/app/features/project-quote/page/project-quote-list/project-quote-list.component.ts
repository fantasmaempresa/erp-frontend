import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { QuoteStatus } from '../../../../data/models/QuoteStatus.model';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { Store } from '@ngrx/store';
import { selectQuotes } from '../../../../state/quotes/quotes.selector';
import {
  emptyQuoteList,
  loadNextPageOfQuotes,
  loadQuotes,
} from '../../../../state/quotes/quotes.actions';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { ProjectQuote } from '../../../../data/models/ProjectQuote.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectQuotePreviewComponent } from '../../dialog/project-quote-preview/project-quote-preview.component';

@Component({
  selector: 'app-project-quote-list',
  templateUrl: './project-quote-list.component.html',
  styleUrls: ['./project-quote-list.component.scss'],
})
export class ProjectQuoteListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<ProjectQuote>(false, []);

  dataSource = new MatTableDataSource<QuoteStatus>();

  quotes$!: Observable<Pagination<QuoteStatus> | null>;

  quotesSubscription!: Subscription;

  totalItems = 0;

  pageSize = 100;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  isSingleClick = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quotesService: ProjectQuoteService,
    private store: Store,
    public dialog: MatDialog,
  ) {
    this.quotes$ = store.select(selectQuotes);
    store.dispatch(loadQuotes());
  }

  ngOnInit() {
    this.quotesSubscription = this.quotes$
      .pipe(
        tap(() => {
          this.isLoadingResults = false;
        }),
      )
      .subscribe((data) => {
        if (data) {
          this.totalItems = data.total;
          this.dataSource = new MatTableDataSource(data.data);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.store.dispatch(emptyQuoteList());
    this.quotesSubscription.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: QuoteStatus): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  async goToNewQuote() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../quote`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar la cotización ${this.selection.selected[0].name}?`,
      'Una vez borrado no hay marcha atras.',
      () => {
        this.quotesService.delete(this.selection.selected[0].id).subscribe({
          next: () => {
            this.selection.clear();
            this.store.dispatch(loadQuotes());
            MessageHelper.successMessage(
              'Registro eliminado con éxito',
              'Se ha eliminado satisfactatoriamente el registro',
            );
          },
          error: ({ error }) => {
            console.log(error.error);
            MessageHelper.errorMessage(error.error);
          },
        });
      },
    );
  }

  preview(row?: ProjectQuote) {
    if (this.selection.selected.length > 0) {
      this.openPreviewDialog(this.selection.selected[0]);
      return;
    }

    if (row) {
      this.openPreviewDialog(row);
    }
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(loadNextPageOfQuotes({ page, size }));
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

  changeSelection(row: ProjectQuote) {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.selection.toggle(row);
      }
    }, 250);
  }

  openPreviewDialog(row: ProjectQuote) {
    this.isSingleClick = false;
    console.log(row);
    const dialogRef = this.dialog.open(ProjectQuotePreviewComponent, {
      panelClass: 'my-dialog',
      width: '100vw',
      height: '95vh',
      data: {
        projectQuote: row,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
