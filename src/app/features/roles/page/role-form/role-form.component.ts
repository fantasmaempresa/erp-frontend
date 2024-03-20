import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { RoleServiceOld, UserServiceOld } from "../../../../data/services";
import { MessageHelper } from "o2c_core";
import { RoleDto } from "../../../../data/dto";

@Component({
  selector: "app-role-form",
  templateUrl: "./role-form.component.html",
  styleUrls: ["./role-form.component.scss"]
})
export class RoleFormComponent {
  roleForm = new UntypedFormGroup({
    name: new UntypedFormControl("", [
      Validators.required,
      Validators.maxLength(100),
    ]),
    description: new UntypedFormControl("", [
      Validators.required,
      Validators.maxLength(200),
    ]),
    config: new UntypedFormGroup({
      modules: new UntypedFormControl(null),
      view_mode: new UntypedFormControl(null)
    })
  });

  isEdit = false;

  modules$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserServiceOld,
    private roleService: RoleServiceOld
  ) {
    this.modules$ = this.roleService.getPermissions();

    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      roleService.fetch(id).subscribe({
        next: (role) => {
          this.roleForm.addControl("id", new UntypedFormControl(""));
          this.roleForm.patchValue(role);
        }
      });
    }
  }

  moduleName = ({ name }: { name: string }) => name;

  onSubmit() {
    let request$: Observable<RoleDto>;
    if (!this.isEdit) {
      request$ = this.roleService.save(this.roleForm.value);
    } else {
      request$ = this.roleService.update(this.roleForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? "actualizado" : "registrado";
        await MessageHelper.successMessage(
          "¡Éxito!",
          `El rol ha sido ${message} correctamente.`
        );
        await this.backToListRoles();
      }
    });
  }

  async backToListRoles() {
    await this.router.navigate(["../"], { relativeTo: this.route });
  }
}
