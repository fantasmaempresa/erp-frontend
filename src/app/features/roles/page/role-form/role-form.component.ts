import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RoleService, UserService } from '../../../../data/services';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { RoleDto } from '../../../../data/dto';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
  roleForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    config: new UntypedFormGroup({
      modules: new UntypedFormControl(null),
      view_mode: new UntypedFormControl(null),
    }),
  });

  isEdit = false;

  modules$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
  ) {
    this.modules$ = this.roleService.getPermissions();

    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      roleService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (role) => {
          this.roleForm.addControl('id', new UntypedFormControl(''));
          this.roleForm.patchValue(role);
        },
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
        let message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage(
          '¡Éxito!',
          `El rol ha sido ${message} correctamente.`,
        );
        await this.backToListRoles();
      },
    });
  }

  async backToListRoles() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
