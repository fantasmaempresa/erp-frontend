import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { GrantorService } from '../../../../data/services/grantor.service';
import { GrantorDto } from '../../../../data/dto/Grantor.dto';
import { StakeView } from 'src/app/data/presentation/Stake.view';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-grantor-form',
  templateUrl: './grantor-form.component.html',
  styleUrls: ['./grantor-form.component.scss'],
})
export class GrantorFormComponent implements OnInit, OnDestroy {
  CURP_REGEX =
    '^([A-Z][AEIOUX][A-Z]{2}d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]d|3[01])[HM](AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}([A-Zd])(d))$';

  grantorForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    father_last_name: new UntypedFormControl('', []),
    mother_last_name: new UntypedFormControl('', []),
    email: new UntypedFormControl('', [Validators.email]),
    phone: new UntypedFormControl('', [Validators.required]),
    birthdate: new UntypedFormControl('', [Validators.required]),
    place_of_birth: new UntypedFormControl('', [Validators.required]),
    rfc: new UntypedFormControl('', [Validators.required]),
    curp: new UntypedFormControl('', [Validators.required]),
    civil_status: new UntypedFormControl('', [Validators.required]),
    municipality: new UntypedFormControl('', [Validators.required]),
    colony: new UntypedFormControl('', [Validators.required]),
    no_int: new UntypedFormControl('', []),
    no_ext: new UntypedFormControl('', [Validators.required]),
    no_locality: new UntypedFormControl('', [Validators.required]),
    locality: new UntypedFormControl('', [Validators.required]),
    zipcode: new UntypedFormControl('', [Validators.required]),
    occupation: new UntypedFormControl('', [Validators.required]),
    type: new UntypedFormControl('', [Validators.required]),
    stake_id: new UntypedFormControl('', [Validators.required]),
    beneficiary: new UntypedFormControl(false, [Validators.required]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  stakeProvider = StakeView;

  typePerson = [
    { id: 1, label: 'Fisica' },
    { id: 2, label: 'Moral' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private grantorService: GrantorService,
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;

    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      grantorService.fetch(id).subscribe({
        next: (grantor) => {
          this.grantorForm.addControl('id', new UntypedFormControl(''));
          this.grantorForm.patchValue(grantor);
        },
      });
    }
  }
  ngOnDestroy() {}

  ngOnInit(): void {
    this.grantorForm.get('type')?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
      this.changeTypeGrantor(value);
    });

    this.updateValidators(this.grantorForm.get('type')?.value);
  }

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

  changeTypeGrantor(event: any) {
    if (event === 1) {
      this.grantorForm.controls.father_last_name.disable();
      this.grantorForm.controls.mother_last_name.disable();
      this.grantorForm.controls.rfc.disable();
      this.grantorForm.controls.curp.disable();
      this.grantorForm.controls.civil_status.disable();
      this.grantorForm.controls.no_int.disable();
      this.grantorForm.controls.phone.disable();
      this.grantorForm.controls.place_of_birth.disable();
      this.grantorForm.controls.occupation.disable();
    }
    if (event === 2) {
      this.grantorForm.controls.father_last_name.enable();
      this.grantorForm.controls.mother_last_name.enable();
      this.grantorForm.controls.rfc.enable();
      this.grantorForm.controls.curp.enable();
      this.grantorForm.controls.civil_status.enable();
      this.grantorForm.controls.no_int.enable();
      this.grantorForm.controls.phone.enable();
      this.grantorForm.controls.place_of_birth.enable();
      this.grantorForm.controls.occupation.enable();
    }
  }

  updateValidators(type: number) {
    if (type === 1) {
      this.grantorForm.get('mother_last_name')?.clearValidators();
      this.grantorForm.get('last_name')?.clearValidators();
      this.grantorForm.get('rfc')?.clearValidators();
      this.grantorForm.get('curp')?.clearValidators();
      this.grantorForm.get('civil_status')?.clearValidators();
      this.grantorForm.get('no_int')?.clearValidators();
      this.grantorForm.get('phone')?.clearValidators();
      this.grantorForm.get('place_of_birth')?.clearValidators();
      this.grantorForm.get('occupation')?.clearValidators();
    } else {
      this.grantorForm
        .get('mother_last_name')
        ?.setValidators(Validators.required);
      this.grantorForm.get('last_name')?.setValidators(Validators.required);
      this.grantorForm.get('rfc')?.setValidators(Validators.required);
      this.grantorForm.get('curp')?.setValidators([Validators.required]);
      this.grantorForm.get('civil_status')?.setValidators(Validators.required);
      // this.grantorForm.get('no_int')?.setValidators(Validators.required);
      this.grantorForm.get('phone')?.setValidators(Validators.required);
      this.grantorForm
        .get('place_of_birth')
        ?.setValidators(Validators.required);
      this.grantorForm.get('occupation')?.setValidators(Validators.required);
    }

    this.grantorForm.get('mother_last_name')?.updateValueAndValidity();
    this.grantorForm.get('last_name')?.updateValueAndValidity();
  }
}
