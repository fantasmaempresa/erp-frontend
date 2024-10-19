import { Component, OnDestroy } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ActivationEnd, Router, RouterEvent } from "@angular/router";
import { MessageHelper } from "o2c_core";
import { filter, map } from "rxjs";
import Swal from "sweetalert2";
import { DocumentView } from "../../../../data/presentation/Document.view";
import { DocumentLinkService } from "../../../../data/services/document-link.service";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: "app-document-link-form",
  templateUrl: "./document-link-form.component.html",
  styleUrls: ["./document-link-form.component.scss"]
})
export class DocumentLinkFormComponent implements OnDestroy {
  edit = false;

  step = 0;

  form!: UntypedFormGroup;

  documentProvider = DocumentView;

  view: string = '';

  constructor(public router: Router,
    public route: ActivatedRoute,
    public _documentLinkService: DocumentLinkService) {

    this.form = new UntypedFormGroup({
      client_id: new UntypedFormControl(null, Validators.required),
      document_id: new UntypedFormControl(null, Validators.required),
      file: new UntypedFormControl(null, Validators.required),
      document_pivot_id: new UntypedFormControl(null, []),
    });

    const idDoc = Number(this.route.snapshot.params.idDoc);
    const timestamp = this.route.snapshot.params.timestamp;
    let id = NaN;

    const data = this.route.snapshot.routeConfig?.data;
    console.log('buscando el orignen --> ', data);

    if (typeof data?.view != 'undefined' && data?.view == 'phase') {
      id = Number(this.route.snapshot.params.procedure_id);
      this.view = 'procedures';
    } else if(typeof this.route.snapshot.params.idIncoming != 'undefined') {
      id = Number(this.route.snapshot.params.idIncoming);
      this.view = 'incomming';
    } else {
      id = Number(this.route.snapshot.params.id);

    }

    console.log('view idddd --> ', id, idDoc);
    if (!isNaN(id)) {
      this.getDataRoute().subscribe(({ view }) => {
        if (view instanceof Object) {
          this.view = '';
          return;
        }
        this.view = view;
        console.log('view documentlink --> ', this.view);
      });

      this.form.get("client_id")?.setValue(id);
    }

    if (!isNaN(idDoc) && timestamp != null) {
      this.form.get("document_id")?.setValue(idDoc);
      this.form.get("document_pivot_id")?.setValue(timestamp);
      this.edit = true;
    }
  }

  async back() {
    await this.router.navigate(["../../../"], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.form.get("file")?.value == null) return;
    console.log(this.form.value);

    const formData = new FormData();
    formData.append("file", this.form.value.file);
    formData.append("client_id", this.form.value.client_id);
    formData.append("document_id", this.form.value.document_id);
    formData.append("document_pivot_id", this.form.value.document_pivot_id);
    formData.append("view", this.view);
    Swal.showLoading();
    if (this.edit) {
      this._documentLinkService.updateAlternative(formData).subscribe({
        next: async (response) => {
          if (response.code == 201) {
            await MessageHelper.successMessage(
              "¡Éxito!",
              response.message
            );
          } else {
            await MessageHelper.successMessage(
              "¡Éxito!",
              "El documento ha sido actualizado correctamente"
            );
            await this.back();
          }
        },
        error: async (error) => {
          console.log(error);
          if (error.error.code != null && error.error.code == 422) {
            if (typeof (error.error.error) === 'object') {
              await MessageHelper.errorMessage('Faltan algunos datos en este formulario');
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
      })
    } else {
      this._documentLinkService.save(formData).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            "¡Éxito!",
            "El documento ha sido registrado correctamente"
          );
          await this.back();
        },
        error: async (error) => {
          console.log(error);
          if (error.error.code != null && error.error.code == 422) {
            if (typeof (error.error.error) === 'object') {
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

  getDataRoute() {
    return this.router.events.pipe(
      // @ts-ignore
      filter((event: RouterEvent) => event instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data),
    );
  }

  ngOnDestroy(): void {

  }
}


@AutoUnsubscribe()
@Component({
  selector: "app-document-phase-link-form",
  templateUrl: "./document-link-form.component.html",
  styleUrls: ["./document-link-form.component.scss"]
})
export class DocumentLinkPhaseFormComponent extends DocumentLinkFormComponent implements OnDestroy {

  constructor(public router: Router,
    public route: ActivatedRoute,
    public _documentLinkService: DocumentLinkService
  ) {
    super(router, route, _documentLinkService);    
    this.view = 'procedures';
  }

  async back() {
    await this.router.navigate(['../../../'], { relativeTo: this.route });
  }
}