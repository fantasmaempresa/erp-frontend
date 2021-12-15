import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { AreaService } from '../../../../data/services/area.service';
import { Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { WorkArea } from '../../../../data/models/WorkArea.model';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss'],
})
export class AreaFormComponent {
  areaForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    config: new FormControl({ test: 'test' }),
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
          this.areaForm.addControl('id', new FormControl(''));
          this.areaForm.patchValue(area);
        },
      });
    }
  }

  async backToListAreas() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<WorkArea>;
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
