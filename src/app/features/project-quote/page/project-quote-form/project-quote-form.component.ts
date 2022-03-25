import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { map, Observable, startWith, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { User } from '../../../../data/models/User.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../../../../shared/components/dialog-search/dialog-search.component';
import { QuoteStatus } from '../../../../data/models/QuoteStatus.model';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { ClientService } from '../../../../data/services/client.service';
import { Client } from '../../../../data/models/Client.model';
import { FormFieldClass } from '../../../../core/classes/FormFieldClass';
import { FormfieldControlService } from '../../../../core/services/formfield-control.service';
import { ConceptService } from '../../../../data/services/concept.service';
import { format } from 'date-fns';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-project-quote-form',
  templateUrl: './project-quote-form.component.html',
  styleUrls: ['./project-quote-form.component.scss'],
})
export class ProjectQuoteFormComponent implements OnInit {
  @Input() formGroupName!: string;

  form!: FormGroup;

  formFields: FormFieldClass<string>[] = [];

  isEdit = false;

  formErrors: any = {};

  clients!: Client[];

  filteredClients$!: Observable<Client[]> | undefined;

  quoteStatuses$!: Observable<QuoteStatus[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private clientService: ClientService,
    private quoteStatusService: QuoteStatusService,
    private conceptService: ConceptService,
    private projectQuoteService: ProjectQuoteService,
    private formfieldService: FormfieldControlService,
    public dialog: MatDialog,
    private rootFormGroup: FormGroupDirective,
  ) {
    this.quoteStatuses$ = this.projectQuoteService
      .fetchAll()
      .pipe(map((statuses) => statuses.data));
    // this.quoteStatuses$ = quoteStatusService.fetchAll().pipe(map((resp) => resp.data));
    this.formFields.push(this.formfieldService.createFormField('textbox', 'name', 'Nombre', true));
    this.filteredClients$ = clientService.fetchAll().pipe(
      map((clients) => clients.data),
      tap((clients) => {
        this.clients = clients;
      }),
      switchMap(() =>
        // @ts-ignore
        this.form.get('client').valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.clients.slice())),
        ),
      ),
    );

    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      clientService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.form.addControl('id', new FormControl(''));
          this.form.patchValue(user);
        },
      });
    }
  }

  ngOnInit(): void {
    console.log(this.rootFormGroup.control.value);
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let { client, date_end, ...projectQuote } = this.form.getRawValue();
    projectQuote.date_end = format(date_end, 'yyyy-MM-dd');
    this.projectQuoteService.save(projectQuote).subscribe({
      next: async () => {
        MessageHelper.successMessage(
          '¡La cotización ha sido creada!',
          `En breve se le notificara a los administradores para que sea verificada`,
        );
        await this.backToListQuotes();
      },
    });
  }

  backToListQuotes() {
    this.router.navigate(['../'], { relativeTo: this.route });
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
      console.log(result);
      this.form.get('client')?.patchValue(result);
      this.form.get('addressee')?.patchValue(result.name);
      console.log(this.form.getRawValue());
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
}
