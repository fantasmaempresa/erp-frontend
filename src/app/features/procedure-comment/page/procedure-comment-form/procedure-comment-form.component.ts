import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedureCommentService } from '../../../../data/services/procedure-comment.service';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procedure-comment-form',
  templateUrl: './procedure-comment-form.component.html',
  styleUrls: ['./procedure-comment-form.component.scss'],
})
export class ProcedureCommentFormComponent {
  edit = false;

  form!: UntypedFormGroup;

  view: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _procedureCommentService: ProcedureCommentService,
  ) {
    this.form = new UntypedFormGroup({
      comment: new UntypedFormControl(null, Validators.required),
      procedure_id: new UntypedFormControl(null, Validators.required),
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.form.get('procedure_id')?.setValue(id);
    }

    const idComment = Number(this.route.snapshot.params.idProcedureCommnet);
    if (!isNaN(idComment)) {
      this.edit = true;
      this._procedureCommentService.fetch(idComment).subscribe({
        next: (row) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(row);
        },
      });
    }
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) return;

    let request$: Observable<any>;

    if (!this.edit) {
      request$ = this._procedureCommentService.save(this.form.value);
    } else {
      request$ = this._procedureCommentService.update(this.form.value);
    }

    Swal.showLoading();

    request$.subscribe({
      next: async () => {
        const message = this.edit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.back();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            await MessageHelper.errorMessage('Faltan algunos datos en este formulario');
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
