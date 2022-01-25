import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subscription, tap } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { StaffService } from '../../../../data/services/staff.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { Staff } from '../../../../data/models/Staff.model';
import { Store } from '@ngrx/store';
import { selectStaff } from '../../../../state/staff/staff.selector';
import {
  emptyStaffList,
  loadNextPageOfStaff,
  loadStaff,
} from '../../../../state/staff/staff.actions';
import { loadClients } from '../../../../state/clients/clients.actions';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'extra_information'];

  selection = new SelectionModel<Staff>(false, []);

  dataSource = new MatTableDataSource<Staff>();

  staff$!: Observable<Pagination<Staff> | null>;

  totalItems = 0;

  pageSize = 100;

  pageEvent!: PageEvent;

  isLoadingResults = true;

  staffSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private store: Store,
  ) {
    this.staff$ = store.select(selectStaff);
    store.dispatch(loadStaff());
  }

  ngOnInit(): void {
    this.staffSubscription = this.staff$
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
    this.store.dispatch(emptyStaffList());
    this.staffSubscription.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Staff): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  async goToNewMemberOfStaff() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  async edit() {
    await this.router.navigate([`../staff-member`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar al usuario ${this.selection.selected[0].name}?`,
      'Una vez borrado no hay marcha atras.',
      () => {
        this.staffService.delete(this.selection.selected[0].id).subscribe({
          next: () => this.store.dispatch(loadClients()),
        });
      },
    );
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(loadNextPageOfStaff({ page, size }));
  }
}
