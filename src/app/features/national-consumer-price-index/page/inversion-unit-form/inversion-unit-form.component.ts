import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
 } from '@angular/forms';
import { InversionUnitService } from 'src/app/data/services/inversion-unit.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { InversionUnitDto } from 'src/app/data/dto/InversionUnit.dto';

@Component({
  selector: 'app-inversion-unit-form',
  templateUrl: './inversion-unit-form.component.html',
  styleUrls: ['./inversion-unit-form.component.scss']
})
export class InversionUnitFormComponent {
  inversionUnitForm = new UntypedFormGroup({
    date: new UntypedFormControl('', [Validators.required]),
    factor: new UntypedFormControl('', [Validators.required]),
  });
  
  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inversionUnitService: InversionUnitService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if(typeof currentRoute == 'undefined'){
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if(!isNaN(id)){
      this.isEdit = true;
      inversionUnitService.fetch(id).subscribe({
        next: (inversionUnit) => {
          this.inversionUnitForm.addControl('id', new UntypedFormControl(''));
          this.inversionUnitForm.patchValue(inversionUnit);
        },
      });
    }
  }

  async backToListInversionUnit(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    let request$: Observable<InversionUnitDto>;
    if (!this.isEdit) {
      request$ = this.inversionUnitService.save(this.inversionUnitForm.value);
    } else {
      request$ = this.inversionUnitService.update(this.inversionUnitForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito',
          `La Unidad de Inversion ha sido ${message} correctamente`,
        );
        await this.backToListInversionUnit();
      },
      error: async () => {
        await MessageHelper.errorMessage(
          'Hubo un error, intente mas tarde porfavor',
          'Error',
        );
      },
    });
  }

}
