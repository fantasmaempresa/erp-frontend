import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ClientLink } from '../../../../data/models/ClientLink.model';
import { ClientLinkService } from '../../../../data/services/client-link.service';

@Component({
  selector: 'app-client-link-form',
  templateUrl: './client-link-form.component.html',
  styleUrls: ['./client-link-form.component.scss'],
})
export class ClientLinkFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    nickname: new FormControl(null),
    address: new FormControl(null),
    rfc: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
    profession: new FormControl(null),
    degree: new FormControl(null),
  });

  isEdit = false;

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
          this.form.addControl('id', new FormControl(''));
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
    let request$: Observable<ClientLink>;
    const clientId = Number(this.route.snapshot.parent?.params.id);
    if (!this.isEdit) {
      request$ = this.clientLinkService.save({ ...this.form.value, client_id: clientId });
    } else {
      request$ = this.clientLinkService.update({ ...this.form.value, client_id: clientId });
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage('¡Éxito!', `El cliente ha sido ${message} correctamente.`);
        await this.back();
      },
    });
  }
}
