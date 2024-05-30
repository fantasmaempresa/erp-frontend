import { Component, OnDestroy } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { MessageHelper } from "o2c_core";
import { ActivatedRoute, Router } from "@angular/router";
import { OperationService } from "../../../../data/services/operation.service";
import { OperationsDto } from "../../../../data/dto/Operations.dto";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { DocumentView } from "src/app/data/presentation/Document.view";
import { DialogDynamicAddItemComponent } from "src/app/shared/components/dialog-dynamic-add-item/dialog-dynamic-add-item.component";
import { MatDialog } from "@angular/material/dialog";
import { DocumentFormComponent } from "src/app/features/documents/page/document-form/document-form.component";
import { CategoryOperationView } from "src/app/data/presentation/CategoryOperation.view";

@AutoUnsubscribe()
@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss'],
})
export class OperationFormComponent implements OnDestroy {
  operationForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new UntypedFormControl('', [
      Validators.maxLength(400),
    ]),
    documents: new UntypedFormControl('', []),
    category_operation_id: new UntypedFormControl('', [Validators.required]),

  });

  isEdit: boolean = false;

  documentProvider = DocumentView;
  categoryOperationProvider = CategoryOperationView;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService,
    public dialog: MatDialog,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      operationService.fetch(id).subscribe({
        next: (operation: OperationsDto) => {
          this.operationForm.addControl('id', new UntypedFormControl(''));
          this.operationForm.patchValue(operation);

          if (typeof operation.config.documents_required != 'undefined') {
            this.operationForm.get('documents')?.setValue(operation.config.documents_required);
          }
        },
      });
    }
  }
  ngOnDestroy() {}

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if(this.operationForm.invalid){
      return;
    }

    let request$: Observable<OperationsDto>;
    if (!this.isEdit) {
      request$ = this.operationService.save(this.operationForm.value);
    } else {
      request$ = this.operationService.update(this.operationForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `La operación ha sido ${message} correctamente.`,
        );
        await this.backToListDocuments();
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

  addItem() {
    this.dialog.open(DialogDynamicAddItemComponent, {
      data: { component: DocumentFormComponent, title: "Agregar nuevo documento" },
      width: '800px',
    });
  }
}
