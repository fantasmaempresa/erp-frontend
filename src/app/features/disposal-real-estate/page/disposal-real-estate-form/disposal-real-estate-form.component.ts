import { Component, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DisposalRealEstateService } from 'src/app/data/services/disposal-real-estate.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { DisposalRealEstateDto } from 'src/app/data/dto/DisposalRealEstate.dto';
import { NationalConsumerPriceIndexView } from 'src/app/data/presentation/NationalConsumerPriceIndex.view';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StakeView } from 'src/app/data/presentation/Stake.view';

@AutoUnsubscribe()
@Component({
  selector: 'app-disposal-real-estate-form',
  templateUrl: './disposal-real-estate-form.component.html',
  styleUrls: ['./disposal-real-estate-form.component.scss']
})
export class DisposalRealEstateFormComponent implements OnDestroy {
  disposalRealEstateForm = new UntypedFormGroup({
    disposal_value: new UntypedFormControl('',[Validators.required]),
    disposal_date: new UntypedFormControl('',[Validators.required]),
    acquisition_value: new UntypedFormControl('',[Validators.required]),
    acquisition_date: new UntypedFormControl('',[Validators.required]),
    real_estate_appraisal: new UntypedFormControl('',[Validators.required]),
    fiscal_appraisal: new UntypedFormControl('',[Validators.required]),
    land_proportion: new UntypedFormControl('',[Validators.required]),
    construction_proportion: new UntypedFormControl('',[Validators.required]),
    acquisition_value_transferor: new UntypedFormControl('',[Validators.required]),
    value_land_proportion: new UntypedFormControl('',[Validators.required]),
    value_construction_proportion: new UntypedFormControl('',[Validators.required]),
    depreciation_rate: new UntypedFormControl('',[Validators.required]),
    annual_depreciation: new UntypedFormControl('',[Validators.required]),
    years_passed: new UntypedFormControl('',[Validators.required]),
    depreciation_value: new UntypedFormControl('',[Validators.required]),
    construction_value: new UntypedFormControl('',[Validators.required]),
    annex_factor: new UntypedFormControl('',[Validators.required]),
    updated_construction_cost: new UntypedFormControl('',[Validators.required]),
    updated_land_cost: new UntypedFormControl('',[Validators.required]),
    disposal_value_transferor: new UntypedFormControl('',[Validators.required]),
    updated_total_cost_acquisition: new UntypedFormControl('',[Validators.required]),
    improvements: new UntypedFormControl('',[Validators.required]),
    appraisal: new UntypedFormControl('',[Validators.required]),
    commissions: new UntypedFormControl('',[Validators.required]),
    isabi: new UntypedFormControl('',[Validators.required]),
    preventive_notices: new UntypedFormControl('',[Validators.required]),
    tax_base: new UntypedFormControl('',[Validators.required]),
    cumulative_profit: new UntypedFormControl('',[Validators.required]),
    not_cumulative_profit: new UntypedFormControl('',[Validators.required]),
    surplus: new UntypedFormControl('',[Validators.required]),
    marginal_tax: new UntypedFormControl('',[Validators.required]),
    isr_charge: new UntypedFormControl('',[Validators.required]),
    isr_pay: new UntypedFormControl('',[Validators.required]),
    isr_federal_entity_pay: new UntypedFormControl('',[Validators.required]),
    rate: new UntypedFormControl('',[Validators.required]),
    isr_federal_entity: new UntypedFormControl('',[Validators.required]),
    isr_federation: new UntypedFormControl('',[Validators.required]),
    ncpi_disposal_id: new UntypedFormControl('',[Validators.required]),
    ncpi_acquisition_id: new UntypedFormControl('',[Validators.required]),
    alienating_id: new UntypedFormControl('',[Validators.required]),
    type_disposal_operation_id: new UntypedFormControl('',[Validators.required]),
    rate_id: new UntypedFormControl('',[Validators.required]),
    nationalConsumerPriceIndexDisposal: new UntypedFormControl('',[Validators.required]),
    nationalConsumerPriceIndexAcquisition: new UntypedFormControl('',[Validators.required]),
    alienating: new UntypedFormControl('',[Validators.required]),
    typeDisposalOperation: new UntypedFormControl('',[Validators.required]),
    rates: new UntypedFormControl('',[Validators.required]),
    acquirers: new UntypedFormControl('',[Validators.required]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  nationalConsumerPriceIndexDisposalProvider = NationalConsumerPriceIndexView;
  stakeProvider = StakeView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private disposalRealEstateService: DisposalRealEstateService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit=true;
      disposalRealEstateService.fetch(id).subscribe({
        next: (disposalRealEstate) => {
          this.disposalRealEstateForm.addControl('id', new UntypedFormControl(''));
          this.disposalRealEstateForm.patchValue(disposalRealEstate);
        }
      });
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented');
  }

  async backToListDisposalRealEstate(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$: Observable<DisposalRealEstateDto>;
    if (!this.isEdit) {
      request$ = this.disposalRealEstateService.save(this.disposalRealEstateForm.value);
    } else {
      request$ = this.disposalRealEstateService.update(this.disposalRealEstateForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La Enajenación de bienes ha sido ${message} correctamente`,
        );
        await this.backToListDisposalRealEstate();
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
