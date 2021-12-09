import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { UserService } from '../../../../data/services/user.service';
import { RoleService } from '../../../../data/services/role.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { Role } from '../../../../data/models/Role.model';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
  roleForm = new FormGroup({
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
    private userService: UserService,
    private roleService: RoleService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      roleService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (role) => {
          this.roleForm.addControl('id', new FormControl(''));
          this.roleForm.patchValue(role);
        },
      });
    }
  }

  onSubmit() {
    let request$: Observable<Role>;
    if (!this.isEdit) {
      request$ = this.roleService.create(this.roleForm.value);
    } else {
      request$ = this.roleService.update(this.roleForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message;
        this.isEdit ? (message = 'actualizado') : (message = 'registrado');
        MessageHelper.successMessage('¡Éxito!', `El rol ha sido ${message} correctamente.`);
        await this.backToListRoles();
      },
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.roleForm,
      validationMessages,
    );
  }

  async backToListRoles() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
