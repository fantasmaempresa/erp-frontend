import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ClientServiceOld } from '../../../../data/services';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { ClientDto } from '../../../../data/dto';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit, OnDestroy {
  clientForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    last_name: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    mother_last_name: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]+$/)
    ]),
    nickname: new UntypedFormControl('',Validators.maxLength(50)),
    address: new UntypedFormControl(null, Validators.required),
    type: new UntypedFormControl(null, Validators.required),
    rfc: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z&Ññ]{3,4}(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))[A-Za-z\d]{2}[A\d]$/)
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientServiceOld,
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      clientService.fetch(id).subscribe({
        next: (client) => {
          this.clientForm.addControl('id', new UntypedFormControl(''));
          this.clientForm.patchValue(client);
        },
      });
    }
  }

  ngOnInit(): void {
    this.clientForm.get('type')?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });

    this.updateValidators(this.clientForm.get('type')?.value);
  }

  async backToListUsers() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  updateValidators(type: number) {
    if (type === 1) {
      this.clientForm.get('mother_last_name')?.clearValidators();
      this.clientForm.get('last_name')?.clearValidators();
    } else {
      this.clientForm.get('mother_last_name')?.setValidators(Validators.required);
      this.clientForm.get('last_name')?.setValidators(Validators.required);
    }

    this.clientForm.get('mother_last_name')?.updateValueAndValidity();
    this.clientForm.get('last_name')?.updateValueAndValidity();
  }

  onSubmit() {
    let request$: Observable<ClientDto>;
    if (!this.isEdit) {
      request$ = this.clientService.save(this.clientForm.value);
    } else {
      request$ = this.clientService.update(this.clientForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El cliente ha sido ${message} correctamente.`,
        );
        await this.backToListUsers();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
          }else{
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

  ngOnDestroy() {}
}
