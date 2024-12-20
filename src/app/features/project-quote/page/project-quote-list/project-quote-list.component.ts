import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProjectQuoteDto, QuoteStatusDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';
import { Pagination } from '../../../../core/interfaces';
import {
  emptyQuoteList,
  loadNextPageOfQuotes,
  loadQuotes,
  loadQuotesByStatus,
  selectQuotes,
} from '../../../../state/quotes';
import { ProjectQuoteService } from '../../../../data/services';
import { ProjectQuotePreviewComponent } from '../../dialog/project-quote-preview/project-quote-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from "sweetalert2";

@Pipe({
  name: 'operationNames'
})
export class OperationNamesPipe implements PipeTransform {
  transform(operations: { [key: string]: { name: string } }): string {
    return Object.values(operations).map(operation => operation.name).join(', ');
  }
}

@Component({
  selector: 'app-project-quote-list',
  templateUrl: './project-quote-list.component.html',
  styleUrls: ['./project-quote-list.component.scss'],
})
export class ProjectQuoteListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  filterOptions = [
    { name: 'En revisión', value: 'review' },
    { name: 'Aprobado', value: 'approved' },
    { name: 'Rechazado', value: 'rejected' },
  ];

  selectedFilter: string = '';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'addressee', 'user', 'operations', 'status_quote'];

  selection = new SelectionModel<ProjectQuoteDto>(false, []);

  dataSource = new MatTableDataSource<QuoteStatusDto>();

  quotes$!: Observable<Pagination<QuoteStatusDto> | null>;

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
  }

  ngOnInit() {
    this.getAllQuotes();
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
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      // @ts-ignore
      row.id + 1
    }`;
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
      'Una vez borrado no hay marcha atrás.',
      () => {
        this.quotesService.delete(this.selection.selected[0].id).subscribe({
          next: async () => {
            this.selection.clear();
            this.store.dispatch(loadQuotes());
            await MessageHelper.successMessage(
              'Registro eliminado con éxito',
              'Se ha eliminado satisfactatoriamente el registro',
            );
          },
          error: async ({ error }) => {
            console.log(error.error);
            await MessageHelper.errorMessage(error.error);
          },
        });
      },
    );
  }

  preview(row?: ProjectQuoteDto) {
    if (this.selection.selected.length > 0) {
      this.openPreviewDialog(this.selection.selected[0]);
      return;
    }

    if (row) {
      this.openPreviewDialog(row);
    }
  }

  downloadQuote() {
    if (this.selection.selected.length > 0) {
      const row: ProjectQuoteDto = this.selection.selected[0];
      Swal.showLoading();
      this.quotesService.getReportProjectQuote(row).subscribe({
        next: async (response) => {
          // @ts-ignore
          const blob = new Blob([response.body], {
            type: response.headers.get('content-type'),
          });
          // @ts-ignore
          const filename = 'cotizacion-pdf-' + row.name;

          // Crea un enlace temporal y simula un clic para descargar el archivo
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          URL.revokeObjectURL(link.href);
          await MessageHelper.successMessage(
            'Cotización generada con éxito',
            'La cotización se genero con éxito',
          );
        },
        error: async () => {
          await MessageHelper.errorMessage(
            'No se puede generar la cotización en este momento intente más tarde',
          );
        },
      });
    }
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(loadNextPageOfQuotes({ page, size }));
  }

  changeSelection(row: ProjectQuoteDto) {
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.selection.toggle(row);
      }
    }, 250);
  }

  openPreviewDialog(row: ProjectQuoteDto) {
    this.isSingleClick = false;
    const dialogRef = this.dialog.open(ProjectQuotePreviewComponent, {
      panelClass: 'my-dialog',
      width: '100vw',
      height: '95vh',
      data: {
        projectQuote: row,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllQuotes();
      }
      console.log('The dialog was closed');
    });
  }

  isSelectedFilter(filter: string) {
    return this.selectedFilter === filter;
  }

  filterBy(option: string) {
    this.selectedFilter = option;
    this.store.dispatch(loadQuotesByStatus({ status: option }));
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

  getAllQuotes() {
    this.selectedFilter = 'all';
    this.store.dispatch(loadQuotes());
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
}
