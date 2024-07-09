import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { GrantorDto } from 'src/app/data/dto/Grantor.dto';
import { StakeView } from 'src/app/data/presentation/Stake.view';
import { GrantorLinkService } from 'src/app/data/services/grantor-link.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-grantor-link-form',
  templateUrl: './grantor-link-form.component.html',
  styleUrls: ['./grantor-link-form.component.scss'],
})
export class GrantorLinkFormComponent {
  CURP_REGEX =
    '^([A-Z][AEIOUX][A-Z]{2}d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]d|3[01])[HM](AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}([A-Zd])(d))$';

  grantorForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    father_last_name: new UntypedFormControl('', [Validators.required]),
    mother_last_name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.email]),
    phone: new UntypedFormControl('', [Validators.required]),
    birthdate: new UntypedFormControl('', [Validators.required]),
    place_of_birth: new UntypedFormControl('', [Validators.required]),
    rfc: new UntypedFormControl('', [Validators.required]),
    curp: new UntypedFormControl('', [Validators.required]),
    civil_status: new UntypedFormControl('', [Validators.required]),
    municipality: new UntypedFormControl('', [Validators.required]),
    colony: new UntypedFormControl('', [Validators.required]),
    street: new UntypedFormControl('', [Validators.required]),
    no_int: new UntypedFormControl('', []),
    no_ext: new UntypedFormControl('', [Validators.required]),
    no_locality: new UntypedFormControl('', [Validators.required]),
    locality: new UntypedFormControl('', [Validators.required]),
    zipcode: new UntypedFormControl('', [Validators.required]),
    occupation: new UntypedFormControl('', [Validators.required]),
    stake_id: new UntypedFormControl('', [Validators.required]),
    grantor_id: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  stakeProvider = StakeView;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grantorService: GrantorLinkService,
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;

    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    const grantor_id = Number(this.route.snapshot.params.idGrantor);
    if (!isNaN(id)) {
      this.isEdit = true;
      grantorService.fetch(id).subscribe({
        next: (grantor) => {
          this.grantorForm.addControl('id', new UntypedFormControl(''));
          this.grantorForm.patchValue(grantor);
        },
      });
    }

    if(!isNaN(grantor_id)){
      this.grantorForm.patchValue({grantor_id: grantor_id});
    }
  }
  ngOnDestroy() {}

  ngOnInit(): void {}

  async backToListGrantors() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    if (this.grantorForm.invalid) {
      return;
    }
    let request$: Observable<GrantorDto>;
    if (!this.isEdit) {
      request$ = this.grantorService.save(this.grantorForm.value);
    } else {
      request$ = this.grantorService.update(this.grantorForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.backToListGrantors();
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
}
