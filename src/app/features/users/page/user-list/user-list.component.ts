import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../data/models/User.model';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, switchMap, tap } from 'rxjs';
import { UserService } from '../../../../data/services/user.service';
import { Pagination } from '../../../../data/models/Pagination.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'verified'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSource$!: Observable<Pagination<User>>;

  resultsLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  nextURL!: string;

  prevURL!: string;

  pageIndex = 1;

  selection = new SelectionModel<User>(false, []);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
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
      switchMap(() => this.userService.changePage(url)),
    );
    this.updateTable(paginator$);
  }

  fetchData() {
    this.dataSource$ = this.userService.fetchAll();
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  delete() {
    MessageHelper.decisionMessage(
      `¿Deseas borrar al usuario ${this.selection.selected[0].name}?`,
      'Una vez borrado no hay marcha atras.',
      () => {
        this.userService.delete(this.selection.selected[0].id).subscribe({
          next: () => this.fetchData(),
        });
      },
    );
  }

  async edit() {
    await this.router.navigate([`../user`], {
      queryParams: { id: this.selection.selected[0].id },
      relativeTo: this.route,
    });
  }

  async goToNewUser() {
    await this.router.navigate(['../new'], { relativeTo: this.route });
  }

  private updateTable(observable$: Observable<any>) {
    observable$
      .pipe(
        tap(() => {
          this.isLoadingResults = false;
        }),
      )
      .subscribe((data: any) => {
        console.log(data);
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
