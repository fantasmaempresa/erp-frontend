import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { RateDto } from 'src/app/data/dto/Rate.dto';
import { RateService } from 'src/app/data/services/rate.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.scss']
})
export class RateFormComponent implements OnDestroy {
  rateForm = new UntypedFormGroup({
    year: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.min(1800),
      Validators.pattern(/^[0-9]+$/),
    ]),
    lower_limit: new UntypedFormControl('', [Validators.required]),
    upper_limit: new UntypedFormControl('', [Validators.required]),
    fixed_fee: new UntypedFormControl('', [Validators.required]),
    surplus: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rateService: RateService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit=true;
      rateService.fetch(id).subscribe({
        next: (rate) => {
          this.rateForm.addControl('id', new UntypedFormControl(''));
          this.rateForm.patchValue(rate);
        },
      });
    }
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  async backToListRate(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$: Observable<RateDto>;
    if (!this.isEdit) {
      request$ = this.rateService.save(this.rateForm.value);
    } else {
      request$ = this.rateService.update(this.rateForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La Tasa ha sido ${message} correctamente`,
        );
        await this.backToListRate();
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

}
