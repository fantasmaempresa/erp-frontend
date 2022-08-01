import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../../../../data/services/user.service';
import { RoleService } from '../../../../data/services/role.service';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { RoleDto } from '../../../../data/dto/Role.dto';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
  roleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    config: new FormControl({ test: 'test' }),
  });

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    let request$: Observable<RoleDto>;
    if (!this.isEdit) {
      request$ = this.roleService.save(this.roleForm.value);
    } else {
      request$ = this.roleService.update(this.roleForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage('¡Éxito!', `El rol ha sido ${message} correctamente.`);
        await this.backToListRoles();
      },
    });
  }

  async backToListRoles() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
