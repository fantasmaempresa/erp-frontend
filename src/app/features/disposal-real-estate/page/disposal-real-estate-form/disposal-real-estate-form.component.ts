import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FORM_CLAZZ, FormComponent, MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { DisposalRealEstateDto } from 'src/app/data/dto/DisposalRealEstate.dto';
import { landProportionAcquiriersForm } from 'src/app/data/presentation/DisposalRealEstate.view';
import { GrantorView } from 'src/app/data/presentation/Grantor.view';
import { TypeDisposalOperationView } from 'src/app/data/presentation/TypeDisposalOperation.view';
import { DisposalRealEstateService } from 'src/app/data/services/disposal-real-estate.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-disposal-real-estate-form',
  templateUrl: './disposal-real-estate-form.component.html',
  styleUrls: ['./disposal-real-estate-form.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: landProportionAcquiriersForm,
    },
  ],
})
export class DisposalRealEstateFormComponent implements OnDestroy {

  private _listFormBuilder!: FormComponent;

  public get formComponent(): FormComponent {
    return this._listFormBuilder;
  }
  
  @ViewChild(FormComponent)
  public set formComponent(value: FormComponent) {
    console.log('seteando formbuilder ---> ', value);
    this._listFormBuilder = value;
  }
  
  disposalRealEstateForm = new UntypedFormGroup({
    type_disposal_operation_id: new UntypedFormControl('', [
      Validators.required,
    ]),
    alienating_id: new UntypedFormControl('', [Validators.required]),
    disposal_value: new UntypedFormControl('', [Validators.required]),
    disposal_date: new UntypedFormControl('', [Validators.required]),
    acquisition_value: new UntypedFormControl('', [Validators.required]),
    acquisition_date: new UntypedFormControl('', [Validators.required]),
    real_estate_appraisal: new UntypedFormControl('', [Validators.required]),
    fiscal_appraisal: new UntypedFormControl('', [Validators.required]),
    land_proportion: new UntypedFormControl('', [Validators.required]),
    depreciation_rate: new UntypedFormControl('', [Validators.required]),
    rate: new UntypedFormControl('', [Validators.required]),
    acquirers: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  typeDisposalOperationProvider = TypeDisposalOperationView;
  grantorProvider = GrantorView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private disposalRealEstateService: DisposalRealEstateService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      disposalRealEstateService.fetch(id).subscribe({
        next: (disposalRealEstate) => {
          this.disposalRealEstateForm.addControl(
            'id',
            new UntypedFormControl(''),
          );
          this.disposalRealEstateForm.patchValue(disposalRealEstate);
          this.formComponent.formBuilderComponent.form.patchValue(
          //@ts-ignore
          disposalRealEstate?.acquirers,
          );
        },
      });
    }
  }

  ngOnDestroy(): void {
  }

  async backToListDisposalRealEstate() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {

    this.disposalRealEstateForm
    .get('acquirers')
    ?.setValue(this.formComponent.formBuilderComponent.form.value.acquirers);
    
    console.log('this.disposalRealEstateForm.value ---> ', this.disposalRealEstateForm.value);
    if(this.disposalRealEstateForm.invalid) return;

    let request$: Observable<DisposalRealEstateDto>;
    if (!this.isEdit) {
      request$ = this.disposalRealEstateService.save(
        this.disposalRealEstateForm.value,
      );
    } else {
      request$ = this.disposalRealEstateService.update(
        this.disposalRealEstateForm.value,
      );
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
