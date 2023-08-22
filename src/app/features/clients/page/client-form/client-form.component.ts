import { Component } from '@angular/core';
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

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    last_name: new UntypedFormControl('', [Validators.required]),
    mother_last_name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    nickname: new UntypedFormControl(null),
    address: new UntypedFormControl(null),
    type: new UntypedFormControl(null, Validators.required),
    rfc: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
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

  async backToListUsers() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
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
      error: async () => {
        await MessageHelper.errorMessage(
          'Hubo un error, intente más tarde por favor',
          'Error',
        );
      },
    });
  }
}
