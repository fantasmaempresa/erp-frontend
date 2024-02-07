import { Component } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProcedureCommentService } from "../../../../data/services/procedure-comment.service";
import { MessageHelper } from "o2c_core";

@Component({
  selector: 'app-procedure-comment-form',
  templateUrl: './procedure-comment-form.component.html',
  styleUrls: ['./procedure-comment-form.component.scss'],
})
export class ProcedureCommentFormComponent {
  edit = false;

  form!: UntypedFormGroup;

  view: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _procedureCommentService: ProcedureCommentService,
  ) {
    this.form = new UntypedFormGroup({
      comment: new UntypedFormControl(null, Validators.required),
      procedure_id: new UntypedFormControl(null, Validators.required),
    });

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.form.get('procedure_id')?.setValue(id);
    }
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this._procedureCommentService.save(this.form.value).subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          '¡Éxito!',
          'El comentario ha sido registrado correctamente',
        );
        await this.back();
      },
      error: async () => {
        await MessageHelper.errorMessage('Error al guardar el comentario');
      },
    });
  }
}
