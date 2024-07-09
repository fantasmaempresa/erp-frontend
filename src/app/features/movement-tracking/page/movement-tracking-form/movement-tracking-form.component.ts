import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MovementTrackingService } from 'src/app/data/services/movement-tracking.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MovementTrackingDto } from 'src/app/data/dto/MovementTracking.dto';
import { ArticleView } from 'src/app/data/presentation/Article.view';
import { WarehouseView } from 'src/app/data/presentation/Warehouse.view';

@AutoUnsubscribe()
@Component({
  selector: 'app-movement-tracking-form',
  templateUrl: './movement-tracking-form.component.html',
  styleUrls: ['./movement-tracking-form.component.scss']
})
export class MovementTrackingFormComponent implements OnDestroy{
  movementTrackingForm = new UntypedFormGroup({
    id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    article_id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    warehouse_id: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    amount: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
    reason: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(20),
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  articleProvider = ArticleView;

  warehouseProvider = WarehouseView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movementTrackingService: MovementTrackingService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      movementTrackingService.fetch(id).subscribe({
        next: (movementTracking) => {
          this.movementTrackingForm.addControl('id', new UntypedFormControl(''));
          this.movementTrackingForm.patchValue(movementTracking);
        }
      })
    }
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented');
  }

  async backToListMovementTracking(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$:  Observable<MovementTrackingDto>;
    if (!this.isEdit) {
      request$ = this.movementTrackingService.save(this.movementTrackingForm.value);
    } else {
      request$ = this.movementTrackingService.update(this.movementTrackingForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message  = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El Seguimiento de Movimiento ha sido ${message} correctamente`,
        );
        await this.backToListMovementTracking();
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
