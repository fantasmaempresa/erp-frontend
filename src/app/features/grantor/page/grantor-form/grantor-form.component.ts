import { Component } from '@angular/core';
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
import { OperationView } from '../../../../data/presentation/Operation.view';
import { StakeView } from 'src/app/data/presentation/Stake.view';

@Component({
  selector: 'app-grantor-form',
  templateUrl: './grantor-form.component.html',
  styleUrls: ['./grantor-form.component.scss'],
})
export class GrantorFormComponent {
  CURP_REGEX =
    '/^([A-Z][AEIOUX][A-Z]{2}\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\\d])(\\d)$/';

  grantorForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    father_last_name: new UntypedFormControl('', []),
    mother_last_name: new UntypedFormControl('', []),
    phone: new UntypedFormControl('', [Validators.required]),
    birthdate: new UntypedFormControl('', [Validators.required]),
    place_of_birth: new UntypedFormControl('', [Validators.required]),
    rfc: new UntypedFormControl('', [Validators.required]),
    curp: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(this.CURP_REGEX),
    ]),
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
    beneficiary: new UntypedFormControl('', [Validators.required]),
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

  async backToListGrantors() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
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
    });
  }

  changeTypeGrantor(event: any) {
    if (event === 1) {
      this.grantorForm.controls.father_last_name.disable();
      this.grantorForm.controls.mother_last_name.disable();
    }
    if (event === 2) {
      this.grantorForm.controls.father_last_name.enable();
      this.grantorForm.controls.mother_last_name.enable();
    }
  }

  protected readonly OperationView = OperationView;
}
