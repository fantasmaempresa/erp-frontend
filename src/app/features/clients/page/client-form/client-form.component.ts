import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../data/services/client.service';
import { Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ClientDto } from '../../../../data/dto/Client.dto';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    nickname: new FormControl(null),
    address: new FormControl(null),
    type: new FormControl(null, Validators.required),
    rfc: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
    ]),
  });

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      clientService.fetch(id).subscribe({
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
    let request$: Observable<ClientDto>;
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
}
