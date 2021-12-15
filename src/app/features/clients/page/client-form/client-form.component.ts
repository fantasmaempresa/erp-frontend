import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { ClientService } from '../../../../data/services/client.service';
import { Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { Client } from '../../../../data/models/Client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    nickname: new FormControl(null),
    address: new FormControl(null),
    rfc: new FormControl(''),
  });

  isEdit = false;

  formErrors: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private clientService: ClientService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      clientService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (client) => {
          this.clientForm.addControl('id', new FormControl(''));
          this.clientForm.patchValue(client);
        },
      });
    }
  }

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<Client>;
    if (!this.isEdit) {
      request$ = this.clientService.save(this.clientForm.value);
    } else {
      request$ = this.clientService.update(this.clientForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage('¡Éxito!', `El cliente ha sido ${message} correctamente.`);
        await this.backToListRoles();
      },
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.clientForm,
      validationMessages,
    );
  }
}
