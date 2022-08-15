import { Component, forwardRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { User } from '../../../../data/models/User.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../../../../shared/components/dialog-search/dialog-search.component';
import { Client } from '../../../../data/models/Client.model';
import { AbstractSubformComponent } from '../../../../shared/components/dynamic-form/abstract-subform.component';

@Component({
  selector: 'app-project-quote-form',
  templateUrl: './project-quote-form.component.html',
  styleUrls: ['./project-quote-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectQuoteFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProjectQuoteFormComponent),
      multi: true,
    },
  ],
})
export class ProjectQuoteFormComponent extends AbstractSubformComponent {
  clients!: Client[];

  constructor(public dialog: MatDialog) {
    super();
    this.formGroup = new FormGroup({
      addressee: new FormControl('', Validators.required),
      client: new FormControl({ value: null, disabled: true }),
      client_id: new FormControl({ value: null, disabled: true }),
      date_end: new FormControl({ value: '', disabled: true }),
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      status_quote_id: new FormControl(null),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: {
        componentOptions: {
          toolbar: false,
          search: true,
          pageSize: 5,
          paginator: true,
        },
        title: 'Buscar cliente',
      },
      width: '75vw',
      height: '75vh',
    });

    dialogRef.afterClosed().subscribe((result: Client) => {
      this.formGroup.get('client')?.patchValue(result);
      this.formGroup.get('addressee')?.patchValue(result.name);
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }

  registerOnChange(onChange: any): void {
    const sub = this.formGroup.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }
}
