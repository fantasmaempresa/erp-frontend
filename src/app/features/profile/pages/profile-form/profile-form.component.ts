import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { UserService } from '../../../../data/services';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnDestroy {
  profileForm = new UntypedFormGroup(
    {
      id: new UntypedFormControl('', [Validators.required]),
      name: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      change_password: new UntypedFormControl('', [Validators.minLength(6)]),
      confirm_change_password: new UntypedFormControl('', [
        Validators.minLength(6),
      ]),
      role_id: new UntypedFormControl(null, [Validators.required]),
      // config: new UntypedFormControl({ test: 'test' }),
      file: new UntypedFormControl(null),
    },
    {
      validators: this.compareValuesValidator(
        'change_password',
        'confirm_change_password',
      ),
    },
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    // @ts-ignore
    let user = JSON.parse(localStorage.getItem('auth'));
    console.log('user --> ', user);
    user = user.user;
    console.log('user --> ', user);
    // this.profileForm.addControl('id', new UntypedFormControl(''));
    this.profileForm.patchValue(user);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    formData.append('id', this.profileForm.value.id);
    formData.append('name', this.profileForm.value.name);
    formData.append('email', this.profileForm.value.email);
    formData.append('password', this.profileForm.value.password);
    formData.append('change_password', this.profileForm.value.change_password);
    formData.append(
      'confirm_change_password',
      this.profileForm.value.confirm_change_password,
    );

    if (this.profileForm.value.file != null)
      formData.append('file', this.profileForm.value.file);

    console.log('form data --> ', formData, this.profileForm.value);
    this.userService.updateMyInfo(formData).subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          '¡Éxito!',
          'Datos actualizados con éxito',
        );
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof error.error.error === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
          }
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
