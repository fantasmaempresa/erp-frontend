import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RoleServiceOld, UserService } from '../../../../data/services';
import { map, Observable } from 'rxjs';
import { RoleDto, UserDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role_id: new UntypedFormControl(null, [Validators.required]),
    config: new UntypedFormControl({ test: 'test' }),
  });

  isEdit = false;

  formErrors: any = {};

  roles$!: Observable<RoleDto[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleServiceOld,
  ) {
    this.roles$ = roleService.fetchAll().pipe(map((roles) => roles.data));
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      userService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.userForm.addControl('id', new UntypedFormControl(''));
          this.userForm.patchValue(user);
        },
      });
    }
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<UserDto>;
    if (!this.isEdit) {
      request$ = this.userService.save(this.userForm.value);
    } else {
      request$ = this.userService.update(this.userForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El usuario ha sido ${message} correctamente.`,
        );
        await this.backToListUsers();
      },
    });
  }
}
