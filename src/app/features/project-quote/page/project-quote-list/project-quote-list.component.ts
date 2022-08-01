import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { QuoteStatusDto } from '../../../../data/dto/QuoteStatus.dto';
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
import { ProjectQuoteDto } from '../../../../data/dto/ProjectQuote.dto';

@Component({
  selector: 'app-project-quote-list',
  templateUrl: './project-quote-list.component.html',
  styleUrls: ['./project-quote-list.component.scss'],
})
export class ProjectQuoteListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<ProjectQuoteDto>(false, []);

  dataSource = new MatTableDataSource<QuoteStatusDto>();

  quotes$!: Observable<Pagination<QuoteStatusDto> | null>;

  quotesSubscription!: Subscription;

  totalItems = 0;

  pageSize = 100;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quotesService: ProjectQuoteService,
    private store: Store,
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
  checkboxLabel(row?: QuoteStatusDto): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.id + 1}`;
  }

  async goToNewQuote() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../quote-status`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar el concepto ${this.selection.selected[0].name}?`,
      'Una vez borrado no hay marcha atras.',
      () => {
        this.quotesService.delete(this.selection.selected[0].id).subscribe({
          next: () => this.store.dispatch(loadQuotes()),
        });
      },
    );
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
}
