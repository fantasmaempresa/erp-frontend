import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RoleServiceOld, UserServiceOld } from '../../../../data/services';
import { map, Observable } from 'rxjs';
import { RoleDto, UserDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';
import { DocumentView } from '../../../../data/presentation/Document.view';
import { ClientView } from '../../../../data/presentation';
import { StaffView } from '../../../../data/presentation/staff.view';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm = new UntypedFormGroup(
    {
      name: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', []),
      confirm_password: new UntypedFormControl('', []),
      role_id: new UntypedFormControl(null, [Validators.required]),
      config: new UntypedFormControl({ test: 'test' }),
      change_password: new UntypedFormControl(null, Validators.minLength(6)),
      confirm_change_password: new UntypedFormControl(null, Validators.minLength(6)),
    },
    {
      validators:
        this.compareValuesValidator(
          'password',
          'confirm_password',
        ),
    },
  );

  isEdit = false;

  formErrors: any = {};

  roles$!: Observable<RoleDto[]>;

  clientProvider = ClientView;

  staffProvider = StaffView;

  disable = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserServiceOld,
    private roleService: RoleServiceOld,
  ) {
    this.roles$ = roleService.fetchAll().pipe(map((roles) => roles.data));
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      userService.fetch(id).subscribe({
        next: (user) => {
          this.userForm.addControl('id', new UntypedFormControl(''));
          this.userForm.patchValue(user);
        },
      });
    }

    if (!this.isEdit) {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('confirm_password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

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
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          await MessageHelper.errorMessage(error.error.error);
        } else if (error.error.code != null && error.error.code == 409) {
          await MessageHelper.errorMessage(
            'Error referente a la base de datos, consulte a su administrador',
          );
        } else if (error.error.code != null && error.error.code == 500) {
          await MessageHelper.errorMessage(
            'Existe un error dentro del servidor, consulte con el administrador',
          );
        } else {
          await MessageHelper.errorMessage(
            'Hubo un error, intente más tarde por favor',
          );
        }
      },
    });
  }

  compareValuesValidator(
    controlName: string,
    compareControlName: string,
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const compareControl = formGroup.get(compareControlName);

      if (!control || !compareControl) {
        return null;
      }

      const controlValue = control.value;
      const compareControlValue = compareControl.value;

      if (controlValue != compareControlValue) {
        compareControl.setErrors({ notEquals: true });
      } else {
        compareControl.setErrors(null);
      }

      return null;
    };
  }
}
