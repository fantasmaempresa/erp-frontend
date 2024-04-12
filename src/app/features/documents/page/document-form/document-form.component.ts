import { Component } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { DocumentDto } from "../../../../data/dto";
import { MessageHelper } from "o2c_core";
import { DocumentService } from "../../../../data/services/document.service";

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
})
export class DocumentFormComponent {
  documentForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', []),
    quote: new UntypedFormControl('', []),
  });

  isEdit: boolean = false;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentService: DocumentService,
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      documentService.fetch(id).subscribe({
        next: (document) => {
          this.documentForm.addControl('id', new UntypedFormControl(''));
          this.documentForm.patchValue(document);
        },
      });
    }
  }

  async backToListDocuments() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    let request$: Observable<DocumentDto>;
    if (!this.isEdit) {
      request$ = this.documentService.save(this.documentForm.value);
    } else {
      request$ = this.documentService.update(this.documentForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El cliente ha sido ${message} correctamente.`,
        );
        await this.backToListDocuments();
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
