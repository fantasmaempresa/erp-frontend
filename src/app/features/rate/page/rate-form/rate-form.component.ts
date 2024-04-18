import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RateService } from 'src/app/data/services/rate.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { RateDto } from 'src/app/data/dto/Rate.dto';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.scss']
})
export class RateFormComponent {
  rateForm = new UntypedFormGroup({
    year: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
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
      error: async () => {
        await MessageHelper.errorMessage(
          'Hubo un error, intente más tarde por favor',
          'Error',
        );
      },
    });
  }

}
