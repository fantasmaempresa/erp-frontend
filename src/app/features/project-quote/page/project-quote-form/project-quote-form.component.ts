import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { UserService } from '../../../../data/services/user.service';
import { RoleService } from '../../../../data/services/role.service';
import { User } from '../../../../data/models/User.model';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../../../../shared/components/dialog-search/dialog-search.component';
import { ClientsListComponent } from '../../../clients/page/clients-list/clients-list.component';

@Component({
  selector: 'app-project-quote-form',
  templateUrl: './project-quote-form.component.html',
  styleUrls: ['./project-quote-form.component.scss'],
})
export class ProjectQuoteFormComponent {
  quoteForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl(null),
    client: new FormControl({ value: null, disabled: true }),
    client_id: new FormControl({ value: null, disabled: true }),
    config: new FormControl({ test: 'test' }),
  });

  isEdit = false;

  formErrors: any = {};

  users!: User[];

  filteredUsers$!: Observable<User[]> | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private userService: UserService,
    private roleService: RoleService,
    public dialog: MatDialog,
  ) {
    this.filteredUsers$ = userService.fetchAll().pipe(
      map((users) => users.data),
      tap((users) => {
        this.users = users;
      }),
      switchMap(() =>
        // @ts-ignore
        this.quoteForm.get('client').valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.users.slice())),
        ),
      ),
    );

    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      userService.fetch(this.route.snapshot.queryParams.id).subscribe({
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
    console.log(this.quoteForm.value);
    // let request$: Observable<User>;
    // if (!this.isEdit) {
    //   request$ = this.userService.create(this.quoteForm.value);
    // } else {
    //   request$ = this.userService.update(this.quoteForm.value);
    // }
    // request$.subscribe({
    //   next: async () => {
    //     let message;
    //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //     this.isEdit ? (message = 'actualizado') : (message = 'registrado');
    //     MessageHelper.successMessage('¡Éxito!', `El usuario ha sido ${message} correctamente.`);
    //     await this.backToListUsers();
    //   },
    // });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      data: {
        component: ClientsListComponent,
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

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.users.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
}
