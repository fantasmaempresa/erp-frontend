import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { RoleServiceOld, UserServiceOld } from "../../../../data/services";
import { MessageHelper } from "o2c_core";
import { RoleDto } from "../../../../data/dto";
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: "app-role-form",
  templateUrl: "./role-form.component.html",
  styleUrls: ["./role-form.component.scss"]
})
export class RoleFormComponent implements OnDestroy{
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
  ngOnDestroy(): void {
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
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          if (typeof(error.error.error) === 'object') {
            let message = '';

            for (let item in error.error.error) {
              message = message + '\n' + error.error.error[item];
            }

            await MessageHelper.errorMessage(message);
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

  async backToListRoles() {
    await this.router.navigate(["../"], { relativeTo: this.route });
  }
}
