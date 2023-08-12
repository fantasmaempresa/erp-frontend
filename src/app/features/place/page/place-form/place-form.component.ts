import { Component } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from '../../../../data/services/operation.service';
import { Observable } from 'rxjs';
import { OperationsDto } from '../../../../data/dto/Operations.dto';
import { MessageHelper } from 'o2c_core';
import { PlaceService } from "../../../../data/services/place.service";
import { PlaceDto } from "../../../../data/dto/Place.dto";

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent {
  placeForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
  });

  isEdit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeService: PlaceService,
  ) {
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      placeService.fetch(id).subscribe({
        next: (operation) => {
          this.placeForm.addControl('id', new UntypedFormControl(''));
          this.placeForm.patchValue(operation);
        },
      });
    }
  }

  async backToListDocuments() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<PlaceDto>;
    if (!this.isEdit) {
      request$ = this.placeService.save(this.placeForm.value);
    } else {
      request$ = this.placeService.update(this.placeForm.value);
    }
    request$.subscribe({
      next: async () => {
        const message = this.isEdit ? 'actualizada' : 'registrada';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `Lugar ha sido ${message} correctamente.`,
        );
        await this.backToListDocuments();
      },
    });
  }
}
