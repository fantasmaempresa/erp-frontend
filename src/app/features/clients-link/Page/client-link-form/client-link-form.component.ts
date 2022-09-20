import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ClientLinkDto } from '../../../../data/dto/ClientLink.dto';
import { ClientLinkService } from '../../../../data/services/client-link.service';

@Component({
  selector: 'app-client-link-form',
  templateUrl: './client-link-form.component.html',
  styleUrls: ['./client-link-form.component.scss'],
})
export class ClientLinkFormComponent {
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    nickname: new UntypedFormControl(null),
    address: new UntypedFormControl(null),
    rfc: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    profession: new UntypedFormControl(null),
    degree: new UntypedFormControl(null),
  });

  isEdit = false;

  degrees = [
    'Primaria',
    'Secundaría',
    'Bachillerato',
    'Licenciatura',
    'Maestría',
    'Doctorado',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientLinkService: ClientLinkService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      clientLinkService.fetch(id).subscribe({
        next: (client) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(client);
        },
      });
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) return;
    let request$: Observable<ClientLinkDto>;
    const clientId = Number(this.route.snapshot.parent?.params.id);
    if (!this.isEdit) {
      request$ = this.clientLinkService.save({
        ...this.form.value,
        client_id: clientId,
      });
    } else {
      request$ = this.clientLinkService.update({
        ...this.form.value,
        client_id: clientId,
      });
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage(
          '¡Éxito!',
          `El cliente ha sido ${message} correctamente.`,
        );
        await this.back();
      },
    });
  }
}
