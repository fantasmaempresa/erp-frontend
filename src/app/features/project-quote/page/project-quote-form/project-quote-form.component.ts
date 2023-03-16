import { Component, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AbstractSubformComponent,
  DialogSearchComponent,
} from '../../../../shared/components';
import { ClientDto, UserDto } from '../../../../data/dto';
import { MatDialog } from '@angular/material/dialog';

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
  clients!: ClientDto[];

  constructor(public dialog: MatDialog) {
    super();
    this.formGroup = new UntypedFormGroup({
      addressee: new UntypedFormControl('', Validators.required),
      client: new UntypedFormControl({ value: null, disabled: true }),
      client_id: new UntypedFormControl({ value: null, disabled: true }),
      date_end: new UntypedFormControl({ value: '', disabled: true }),
      description: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl('', Validators.required),
      status_quote_id: new UntypedFormControl(null),
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

    dialogRef.afterClosed().subscribe((result: ClientDto) => {
      this.formGroup.get('client')?.patchValue(result);
      this.formGroup.get('addressee')?.patchValue(result.name);
    });
  }

  displayFn(user: UserDto): string {
    return user && user.name ? user.name : '';
  }

  registerOnChange(onChange: any): void {
    const sub = this.formGroup.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  private _filter(name: string): ClientDto[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
