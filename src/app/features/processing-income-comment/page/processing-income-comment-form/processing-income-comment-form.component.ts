import { Component, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { ProcessingIncomeCommentService } from 'src/app/data/services/processing-income-comment.service';
import Swal from 'sweetalert2';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-processing-income-comment-form',
  templateUrl: './processing-income-comment-form.component.html',
  styleUrls: ['./processing-income-comment-form.component.scss'],
})
export class ProcessingIncomeCommentFormComponent implements OnDestroy {
  edit = false;

  form!: UntypedFormGroup;

  view: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _processingIncomeCommentService: ProcessingIncomeCommentService,
  ) {
    this.form = new UntypedFormGroup({
      comment: new UntypedFormControl(null, Validators.required),
      processing_income_id: new UntypedFormControl(null, Validators.required),
    });

    const id = Number(this.route.snapshot.params.idProcessingIncome);
    const idComment = Number(this.route.snapshot.params.idProcessingIncomeComment);
    if (!isNaN(id)) {
      this.form.get('processing_income_id')?.setValue(id);
    }else {
      this.back();
    }
    if (!isNaN(idComment)) {
      this.edit = true;
      this._processingIncomeCommentService.fetch(idComment).subscribe({
        next: (row) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(row);
        },
      });
    }
  }
  ngOnDestroy(): void {
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) return;

    let request$: Observable<any>;

    if (!this.edit) {
      request$ = this._processingIncomeCommentService.save(this.form.value);
    } else {
      request$ = this._processingIncomeCommentService.update(this.form.value);
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
