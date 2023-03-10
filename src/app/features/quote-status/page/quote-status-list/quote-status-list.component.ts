import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Observable, Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { QuoteStatusDto } from '../../../../data/dto/QuoteStatus.dto';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { Store } from '@ngrx/store';
import { selectQuoteStatus } from '../../../../state/quote-status/quote-status.selectors';
import {
  emptyQuoteStatusList,
  laodNextPageOfQuoteStatus,
  loadQuoteStatuses,
} from '../../../../state/quote-status/quote-status.actions';

@Component({
  selector: 'app-quote-status-list',
  templateUrl: './quote-status-list.component.html',
  styleUrls: ['./quote-status-list.component.scss'],
})
export class QuoteStatusListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<QuoteStatusDto>(false, []);

  dataSource = new MatTableDataSource<QuoteStatusDto>();

  quoteStatus$!: Observable<Pagination<QuoteStatusDto> | null>;

  quoteStatusSubscription!: Subscription;

  totalItems = 0;

  pageSize = 100;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quoteStatusService: QuoteStatusService,
    private store: Store,
  ) {
    this.quoteStatus$ = store.select(selectQuoteStatus);
    store.dispatch(loadQuoteStatuses());
  }

  ngOnInit() {
    this.quoteStatusSubscription = this.quoteStatus$
      .pipe(
        tap(() => {
          this.isLoadingResults = false;
        }),
      )
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

  ngOnDestroy() {
    this.store.dispatch(emptyQuoteStatusList());
    this.quoteStatusSubscription.unsubscribe();
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

  async goToNewQuoteStatus() {
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
        this.quoteStatusService
          .delete(this.selection.selected[0].id)
          .subscribe({
            next: () => this.store.dispatch(loadQuoteStatuses()),
          });
      },
    );
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(laodNextPageOfQuoteStatus({ page, size }));
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
