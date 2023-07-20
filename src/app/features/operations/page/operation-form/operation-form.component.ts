import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DocumentDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from '../../../../data/services/operation.service';
import { OperationsDto } from "../../../../data/dto/Operations.dto";

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss'],
})
export class OperationFormComponent {
  operationForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', []),
  });

  isEdit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      operationService.fetch(id).subscribe({
        next: (operation) => {
          this.operationForm.addControl('id', new UntypedFormControl(''));
          this.operationForm.patchValue(operation);
        },
      });
    }
  }

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
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
    });
  }
}
