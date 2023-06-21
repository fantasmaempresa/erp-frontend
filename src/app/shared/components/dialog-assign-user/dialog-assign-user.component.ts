import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentView } from "../../../data/presentation/Document.view";
import { UserView } from "../../../data/presentation";
import { UserService } from "../../../data/services";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ClientDto, StaffDto } from "../../../data/dto";
import { MessageHelper } from "o2c_core";
import Swal from "sweetalert2";

@Component({
  selector: "app-dialog-assign-user",
  templateUrl: "./dialog-assign-user.component.html",
  styleUrls: ["./dialog-assign-user.component.scss"]
})
export class DialogAssignUserComponent {

  form!: UntypedFormGroup;

  userProvider = UserView;

  constructor(
    public dialogRef: MatDialogRef<DialogAssignUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { view: string; entity: ClientDto | StaffDto },
    public _userService: UserService
  ) {
    this.form = new UntypedFormGroup({
      view: new UntypedFormControl(null, Validators.required),
      user_id: new UntypedFormControl(null, Validators.required),
      entity_id: new UntypedFormControl(null, Validators.required)
    });

    this.form.get("view")?.setValue(this.data.view);
    this.form.get("entity_id")?.setValue(this.data.entity.id);
  }

  onSubmit() {
    console.log("submit");
    if (this.form.invalid) {
      return;
    }
    Swal.showLoading();
    this._userService.assignUser(this.form.value).subscribe({
      next: async () => {
        await MessageHelper.successMessage(
          "¡Éxito!",
          "Se ha asignado correctamente un usuario al Personal"
        );
        await this.dialogRef.close();
      },
      error: async () => {
        await MessageHelper.errorMessage("Error al asignar usuario al Personal");
      }
    });
  }

  change($event: any) {
    console.log("$event-->", $event);
  }
}
