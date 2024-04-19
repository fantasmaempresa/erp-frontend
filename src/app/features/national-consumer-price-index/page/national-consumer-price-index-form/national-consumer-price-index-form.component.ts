import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NationalConsumerPriceIndexService } from '../../../../data/services/national-consumer-price-index.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { NationalConsumerPriceIndexDto } from 'src/app/data/dto';

@Component({
  selector: 'app-national-consumer-price-index-form',
  templateUrl: './national-consumer-price-index-form.component.html',
  styleUrls: ['./national-consumer-price-index-form.component.scss'],
})
export class NationalConsumerPriceIndexFormComponent {
  nationalConsumerPriceIndexForm = new UntypedFormGroup({
    year: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.min(1800),
      Validators.pattern(/^[0-9]+$/),
    ]),
    month: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(2),
      Validators.min(1),
      Validators.max(12),
      Validators.pattern(/^[0-9]+$/),
    ]),
    value: new UntypedFormControl('',[
      Validators.required,
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private nationalConsumerPriceIndexService: NationalConsumerPriceIndexService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined'){
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if(!isNaN(id)){
      this.isEdit=true;
      nationalConsumerPriceIndexService.fetch(id).subscribe({
        next: (nationalConsumerPriceIndex) => {
          this.nationalConsumerPriceIndexForm.addControl('id', new UntypedFormControl(''));
          this.nationalConsumerPriceIndexForm.patchValue(nationalConsumerPriceIndex);
        },
      });
    }
  }

  async backToListNationalConsumerPriceIndex() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route}); 
    }
  }

  onSubmit() {
    let request$: Observable<NationalConsumerPriceIndexDto>;
    if (!this.isEdit) {
      request$ = this.nationalConsumerPriceIndexService.save(this.nationalConsumerPriceIndexForm.value);
    } else {
      request$ = this.nationalConsumerPriceIndexService.update(this.nationalConsumerPriceIndexForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito',
        `El Precio Nacional al Consumido ha sido ${message} correctamente`,
        );
        await this.backToListNationalConsumerPriceIndex();
      },
      error: async () => {
        await MessageHelper.errorMessage(
          'Hubo un error, intente mas tarde por favor',
          'Error',
        );
      },
    });
  }

}
