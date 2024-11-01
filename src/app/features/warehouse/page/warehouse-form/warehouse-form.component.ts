import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { WarehouseService } from 'src/app/data/services/warehouse.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WarehouseDto } from 'src/app/data/dto/Warehouse.dto';

@AutoUnsubscribe()
@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.scss']
})
export class WarehouseFormComponent implements OnDestroy{
  warehouseForm = new UntypedFormGroup({
    name: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
    address: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(100),
    ]),
    type: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(59),
    ]),
    status: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      warehouseService.fetch(id).subscribe({
        next: (warehouse) => {
          this.warehouseForm.addControl('id', new UntypedFormControl(''));
          this.warehouseForm.patchValue(warehouse);
        }
      })
    }
  }

  ngOnDestroy(): void {
  }

  async backToListWarehouse(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  
  onSubmit() {
    let request$:  Observable<WarehouseDto>;
    if (!this.isEdit) {
      request$ = this.warehouseService.save(this.warehouseForm.value);
    } else {
      request$ = this.warehouseService.update(this.warehouseForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message  = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El Almacén ha sido ${message} correctamente`,
        );
        await this.backToListWarehouse();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code !=  null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            let message = '';

            for (let item in error.error.error){
              message = message + '\n' + error.error.error[item];
            }
            await MessageHelper.errorMessage(message);
          } else {
            await MessageHelper.errorMessage(error.error.error);
          }
        } else if (error.error.code != null && error.error.code ==  409) {
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
