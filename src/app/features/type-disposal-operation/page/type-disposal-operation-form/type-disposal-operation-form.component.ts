import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
 } from '@angular/forms';
 import { TypeDisposalOperationService } from 'src/app/data/services/type-disposal-operation.service';
 import { Observable } from 'rxjs';
 import { MessageHelper } from 'o2c_core';
 import { TypeDisposalOperationDto } from 'src/app/data/dto/TypeDisposalOperation.dto';
 import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

 @AutoUnsubscribe()
@Component({
  selector: 'app-type-disposal-operation-form',
  templateUrl: './type-disposal-operation-form.component.html',
  styleUrls: ['./type-disposal-operation-form.component.scss']
})
export class TypeDisposalOperationFormComponent implements OnDestroy {
  typeDisposalOperationForm = new UntypedFormGroup({
    type: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(150),
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private typeDisposalOperationService: TypeDisposalOperationService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if(!isNaN(id)){
      this.isEdit=true;
      typeDisposalOperationService.fetch(id).subscribe({
        next: (typeDisposalOperation) => {
          this.typeDisposalOperationForm.addControl('id', new UntypedFormControl(''));
          this.typeDisposalOperationForm.patchValue(typeDisposalOperation);
        }
      });
    }
  }
   ngOnDestroy(): void {
     throw new Error('Method not implemented.');
   }

  async backToListTypeDisposalOperation(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$: Observable<TypeDisposalOperationDto>;
    if (!this.isEdit) {
      request$ = this.typeDisposalOperationService.save(this.typeDisposalOperationForm.value);
    } else {
      request$ = this.typeDisposalOperationService.update(this.typeDisposalOperationForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito',
          `La Operación de eliminación ha sido ${message} correctamente`,
        );
        await this.backToListTypeDisposalOperation();
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
