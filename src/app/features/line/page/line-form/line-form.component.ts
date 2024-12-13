import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
 UntypedFormControl,
 UntypedFormGroup,
 Validators,
} from '@angular/forms';
import { LineService } from 'src/app/data/services/line.service';
import { Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { LineDto } from 'src/app/data/dto/Line.dto';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.scss']
})
export class LineFormComponent implements OnDestroy{
  lineForm = new UntypedFormGroup({
    line: new UntypedFormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lineService: LineService,
  ){
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute == 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      lineService.fetch(id).subscribe({
        next: (line) => {
          this.lineForm.addControl('id', new UntypedFormControl(''));
          this.lineForm.patchValue(line);
        }
      });
    }
  }

  ngOnDestroy(): void {
  }

  async backToListLine(){
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  onSubmit() {
    let request$:  Observable<LineDto>;
    if (!this.isEdit) {
      request$ = this.lineService.save(this.lineForm.value);
    } else {
      request$ = this.lineService.update(this.lineForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message  = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La Línea ha sido ${message} correctamente`,
        );
        await this.backToListLine();
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
