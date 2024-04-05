import { Component } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { DocumentView } from "../../../../data/presentation/Document.view";
import { ActivatedRoute, ActivationEnd, Router, RouterEvent } from "@angular/router";
import { filter, map } from "rxjs";
import { DocumentLinkService } from "../../../../data/services/document-link.service";
import { MessageHelper } from "o2c_core";
import Swal from "sweetalert2";

@Component({
  selector: "app-document-link-form",
  templateUrl: "./document-link-form.component.html",
  styleUrls: ["./document-link-form.component.scss"]
})
export class DocumentLinkFormComponent {
  edit = false;

  step = 0;

  form!: UntypedFormGroup;

  documentProvider = DocumentView;

  view: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _documentLinkService: DocumentLinkService) {

    this.form = new UntypedFormGroup({
      client_id: new UntypedFormControl(null, Validators.required),
      document_id: new UntypedFormControl(null, Validators.required),
      file: new UntypedFormControl(null, Validators.required),
    });

    const id = Number(this.route.snapshot.params.id);
    const idDoc = Number(this.route.snapshot.params.idDoc);
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

    if(!isNaN(idDoc)) {
      this.form.get("document_id")?.setValue(idDoc);
      this.edit =  true;
    }
  }

  async back() {
    await this.router.navigate(["../"], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.form.get("file")?.value == null) return;
    console.log(this.form.value);

    const formData = new FormData();
    formData.append("file", this.form.value.file);
    formData.append("client_id", this.form.value.client_id);
    formData.append("document_id", this.form.value.document_id);
    formData.append("view", this.view);
    Swal.showLoading();
    if(this.edit){
      this._documentLinkService.updateAlternative(formData).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            "¡Éxito!",
            "El documento ha sido actualizado correctamente"
          );
          await this.back();
        },
        error: async () => {
          await MessageHelper.errorMessage("Error al cargar el archivo");
        }
      })
    }else {
      this._documentLinkService.save(formData).subscribe({
        next: async () => {
          await MessageHelper.successMessage(
            "¡Éxito!",
            "El documento ha sido registrado correctamente"
          );
          await this.back();
        },
        error: async () => {
          await MessageHelper.errorMessage("Error al cargar el archivo");
        }
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
}
