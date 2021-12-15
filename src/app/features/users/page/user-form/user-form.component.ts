import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { UserService } from '../../../../data/services/user.service';
import { RoleService } from '../../../../data/services/role.service';
import { map, Observable } from 'rxjs';
import { Role } from '../../../../data/models/Role.model';
import { User } from '../../../../data/models/User.model';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl(null),
    config: new FormControl({ test: 'test' }),
  });

  isEdit = false;

  formErrors: any = {};

  roles$!: Observable<Role[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private userService: UserService,
    private roleService: RoleService,
  ) {
    this.roles$ = roleService.fetchAll().pipe(map((roles) => roles.data));
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      userService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.userForm.addControl('id', new FormControl(''));
          this.userForm.patchValue(user);
        },
      });
    }
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<User>;
    if (!this.isEdit) {
      request$ = this.userService.save(this.userForm.value);
    } else {
      request$ = this.userService.update(this.userForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage('¡Éxito!', `El usuario ha sido ${message} correctamente.`);
        await this.backToListUsers();
      },
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.userForm,
      validationMessages,
    );
  }
}
