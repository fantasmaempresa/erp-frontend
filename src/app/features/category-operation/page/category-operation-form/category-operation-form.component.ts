import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { CategoryOperationDto } from 'src/app/data/dto/CategoryOperation.dto';
import { DocumentView } from 'src/app/data/presentation/Document.view';
import { GeneralTemplanteView } from 'src/app/data/presentation/GeneralTemplate.view';
import { CategoryOperationService } from 'src/app/data/services/category-operation.service';
import { DocumentFormComponent } from 'src/app/features/documents/page/document-form/document-form.component';
import { DialogDynamicAddItemComponent } from 'src/app/shared/components/dialog-dynamic-add-item/dialog-dynamic-add-item.component';

@Component({
  selector: 'app-category-operation-form',
  templateUrl: './category-operation-form.component.html',
  styleUrls: ['./category-operation-form.component.scss'],
})
@AutoUnsubscribe()
export class CategoryOperationFormComponent implements OnDestroy {
  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new UntypedFormControl('', [Validators.maxLength(400)]),
    general_template_id: new UntypedFormControl(null, []),
    documents: new UntypedFormControl('', [Validators.required]),
    config: new UntypedFormGroup({
      RegistrationProcedureData: new UntypedFormControl(false),
      ProcessingIncomeData: new UntypedFormControl(false),
      Shape01: new UntypedFormControl(false),
      Shape02: new UntypedFormControl(false),
    }),
  });

  isEdit = false;

  generalTemplateProvider = GeneralTemplanteView;
  documentProvider = DocumentView;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _categoryOperationService: CategoryOperationService,
    public dialog: MatDialog,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      this._categoryOperationService.fetch(id).subscribe({
        next: (category) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(category);
          //@ts-ignore
          if (typeof category.config?.documents_required !== 'undefined') {
            this.form
              .get('documents')
            //@ts-ignore
              ?.setValue(category.config.documents_required);
          }
        },
      });
    }
  }
  ngOnDestroy() {}

  async backToList() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  addItem() {
    this.dialog.open(DialogDynamicAddItemComponent, {
      data: {
        component: DocumentFormComponent,
        title: 'Agregar nuevo documento',
      },
      width: '800px',
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let request$: Observable<CategoryOperationDto>;
    if (!this.isEdit) {
      request$ = this._categoryOperationService.save(this.form.value);
    } else {
      request$ = this._categoryOperationService.update(this.form.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.backToList();
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
