import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { User } from '../../../../data/models/User.model';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../../../../shared/components/dialog-search/dialog-search.component';
import { QuoteStatus } from '../../../../data/models/QuoteStatus.model';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { ProjectQuoteService } from '../../../../data/services/project-quote.service';
import { ClientService } from '../../../../data/services/client.service';
import { Client } from '../../../../data/models/Client.model';

@Component({
  selector: 'app-project-quote-form',
  templateUrl: './project-quote-form.component.html',
  styleUrls: ['./project-quote-form.component.scss'],
})
export class ProjectQuoteFormComponent {
  quoteForm = new FormGroup({
    user_id: new FormControl(2),
    name: new FormControl(''),
    description: new FormControl(''),
    date_end: new FormControl({ value: null, disabled: true }),
    status_quote_id: new FormControl(null),
    client: new FormControl({ value: null, disabled: true }),
    client_id: new FormControl({ value: null, disabled: true }),
  });

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
    private projectQuoteService: ProjectQuoteService,
    public dialog: MatDialog,
  ) {
    this.quoteStatuses$ = quoteStatusService.fetchAll().pipe(map((resp) => resp.data));

    this.filteredClients$ = clientService.fetchAll().pipe(
      map((clients) => clients.data),
      tap((clients) => {
        this.clients = clients;
      }),
      switchMap(() =>
        // @ts-ignore
        this.quoteForm.get('client').valueChanges.pipe(
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
          this.quoteForm.addControl('id', new FormControl(''));
          this.quoteForm.patchValue(user);
        },
      });
    }
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log(this.quoteForm.getRawValue());
    let { client, ...projectQuote } = this.quoteForm.getRawValue();
    projectQuote.client_id = client.id;
    console.log(projectQuote);
    this.projectQuoteService.save(projectQuote).subscribe((resp) => console.log(resp));
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

    dialogRef.afterClosed().subscribe((result) => {
      this.quoteForm.get('client')?.patchValue(result);
      console.log(this.quoteForm.getRawValue());
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.quoteForm,
      validationMessages,
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
}
