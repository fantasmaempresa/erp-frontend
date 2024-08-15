import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { UnitDto } from 'src/app/data/dto/Unit.dto';
import { UnitService } from 'src/app/data/services/unit.service';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@AutoUnsubscribe()
@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class UnitFormComponent implements OnDestroy {
  form = new UntypedFormGroup({
    name: new UntypedFormControl(null, Validators.required),
    value: new UntypedFormControl(null, Validators.required),
    year: new UntypedFormControl(moment(), Validators.required),
  });

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _unitService: UnitService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      this._unitService.fetch(id).subscribe({
        next: (unit) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(unit);
        },
      });
    }
  }
  ngOnDestroy() {}

  async backToList() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    let request$: Observable<UnitDto>;
    if (!this.isEdit) {
      request$ = this._unitService.save(this.form.value);
    } else {
      request$ = this._unitService.update(this.form.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El cliente ha sido ${message} correctamente.`,
        );
        await this.backToList();
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

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.get('year')?.value ?? moment();;
    ctrlValue.year(normalizedMonthAndYear.year());
    this.form.get('year')?.setValue(ctrlValue);
    datepicker.close();
  }
}
