import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { FormValidationService } from "../../../../shared/services/form-validation.service";
import { AreaService } from "../../../../data/services/area.service";
import { Observable } from "rxjs";
import { MessageHelper } from "../../../../shared/helpers/MessageHelper";
import { validationMessages } from "../../../../core/constants/validationMessages";
import { WorkAreaDto } from "../../../../data/dto/WorkArea.dto";

@Component({
  selector: "app-area-form",
  templateUrl: "./area-form.component.html",
  styleUrls: ["./area-form.component.scss"]
})
export class AreaFormComponent {
  areaForm = new UntypedFormGroup({
    name: new UntypedFormControl("", [Validators.required]),
    description: new UntypedFormControl("", [Validators.required]),
    config: new UntypedFormControl({ test: "test" })
  });

  isEdit = false;

  formErrors: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formValidationService: FormValidationService,
    private areaService: AreaService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      areaService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (area) => {
          this.areaForm.addControl("id", new UntypedFormControl(""));
          this.areaForm.patchValue(area);
        },
      });
    }
  }

  async backToListAreas() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<WorkAreaDto>;
    if (!this.isEdit) {
      request$ = this.areaService.save(this.areaForm.value);
    } else {
      request$ = this.areaService.update(this.areaForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        MessageHelper.successMessage('¡Éxito!', `El area ha sido ${message} correctamente.`);
        await this.backToListAreas();
      },
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.areaForm,
      validationMessages,
    );
  }
}
