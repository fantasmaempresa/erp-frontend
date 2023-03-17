import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { QuoteStatusDto, QuoteTemplate } from '../../../../data/dto';
import { Observable, Subscription, tap } from 'rxjs';
import { Pagination } from '../../../../core/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { emptyQuoteList, loadNextPageOfQuotes } from '../../../../state/quotes';
import { MessageHelper } from 'o2c_core';
import {
  loadQuoteTemplates,
  selectQuoteTemplates,
} from '../../../../state/quote-template';
import { QuoteTemplateService } from '../../../../data/services';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<QuoteTemplate>(false, []);

  dataSource = new MatTableDataSource<QuoteTemplate>();

  templates$!: Observable<Pagination<QuoteTemplate> | null>;

  templatesSubscription!: Subscription;

  totalItems = 0;

  pageSize = 100;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private templateService: QuoteTemplateService,
    private store: Store,
  ) {
    this.templates$ = store.select(selectQuoteTemplates);
    store.dispatch(loadQuoteTemplates());
  }

  ngOnInit() {
    this.templatesSubscription = this.templates$
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
    this.templatesSubscription.unsubscribe();
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
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  async goToNewQuote() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../quote-template`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar la plantilla ${this.selection.selected[0].name}?`,
      'Una vez borrado no hay marcha atras.',
      () => {
        this.templateService.delete(this.selection.selected[0].id).subscribe({
          next: () => {
            MessageHelper.successMessage(
              'Éxito',
              `Plantilla ${this.selection.selected[0].name} borrada correctamente`,
            );
            this.store.dispatch(loadQuoteTemplates());
            this.selection.clear();
          },
          error: ({ error }) => {
            MessageHelper.errorMessage(error.error);
          },
        });
      },
    );
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(loadNextPageOfQuotes({ page, size }));
  }
}
