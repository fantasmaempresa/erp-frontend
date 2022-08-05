import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { User } from '../../../../data/models/User.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../../../../shared/components/dialog-search/dialog-search.component';
import { ClientService } from '../../../../data/services/client.service';
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
export class ProjectQuoteFormComponent
  extends AbstractSubformComponent
  implements OnInit, AfterContentChecked
{
  clients!: Client[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
  ) {
    super();
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      addressee: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date_end: new FormControl({ value: '', disabled: true }),
      status_quote_id: new FormControl(null),
      client: new FormControl({ value: null, disabled: true }),
      client_id: new FormControl({ value: null, disabled: true }),
    });
  }

  ngOnInit(): void {
    // this.quoteStatuses$ = this.projectQuoteService
    //   .fetchAll()
    //   .pipe(map((statuses) => statuses.data));
    // this.filteredClients$ = this.clientService.fetchAll().pipe(
    //   map((clients) => clients.data),
    //   tap((clients) => {
    //     this.clients = clients;
    //   }),
    //   switchMap(() =>
    //     this.formGroup.get('client').valueChanges.pipe(
    //       startWith(''),
    //       map((value) => {
    //         if (!value) {
    //           return null;
    //         }
    //         return typeof value === 'string' ? value : value.name;
    //       }),
    //       map((name) => (name ? this._filter(name) : this.clients.slice())),
    //     ),
    //   ),
    // );
  }

  ngAfterContentChecked(): void {
    // this.formGroup.get('name')?.setValidators([Validators.required]);
    // this.formGroup.get('addressee')?.setValidators([Validators.required]);
    // this.formGroup.get('description')?.setValidators([Validators.required]);
    this.cd.detectChanges();
  }

  // onSubmit() {
  //   // eslint-disable-next-line @typescript-eslint/naming-convention
  //   let { client, date_end, ...projectQuote } = this.formGroup.getRawValue();
  //   projectQuote.date_end = format(date_end, 'yyyy-MM-dd');
  //   this.projectQuoteService.save(projectQuote).subscribe({
  //     next: async () => {
  //       MessageHelper.successMessage(
  //         '¡La cotización ha sido creada!',
  //         `En breve se le notificara a los administradores para que sea verificada`,
  //       );
  //       await this.backToListQuotes();
  //     },
  //   });
  // }

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
      console.log(result);
      this.formGroup.get('client')?.patchValue(result);
      this.formGroup.get('addressee')?.patchValue(result.name);
      console.log(this.formGroup.getRawValue());
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  registerOnChange(onChange: any): void {
    const sub = this.formGroup.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }
}
