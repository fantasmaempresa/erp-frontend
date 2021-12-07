import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ELEMENT_DATA, PeriodicElement } from '../../../users/page/user-list/user-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.scss'],
})
export class AreasListComponent {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(false, []);

  constructor(private router: Router, private route: ActivatedRoute) {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  delete() {
    console.log(this.selection.selected);
  }

  goToNewArea() {
    this.router.navigate(['../new'], { relativeTo: this.route });
  }
}
