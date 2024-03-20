import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RoleServiceOld, UserServiceOld } from '../../../../data/services';
import { map, Observable } from 'rxjs';
import { RoleDto, UserDto } from '../../../../data/dto';
import { MessageHelper } from 'o2c_core';
import { DocumentView } from '../../../../data/presentation/Document.view';
import { ClientView } from '../../../../data/presentation';
import { StaffView } from '../../../../data/presentation/staff.view';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role_id: new UntypedFormControl(null, [Validators.required]),
    config: new UntypedFormControl({ test: 'test' }),
  });

  isEdit = false;

  formErrors: any = {};

  roles$!: Observable<RoleDto[]>;

  clientProvider = ClientView;

  staffProvider = StaffView;

  disable = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserServiceOld,
    private roleService: RoleServiceOld,
  ) {
    this.roles$ = roleService.fetchAll().pipe(map((roles) => roles.data));
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      userService.fetch(id).subscribe({
        next: (user) => {
          this.userForm.addControl('id', new UntypedFormControl(''));
          this.userForm.patchValue(user);
        },
      });
    }
  }

  async backToListUsers() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<UserDto>;
    if (!this.isEdit) {
      request$ = this.userService.save(this.userForm.value);
    } else {
      request$ = this.userService.update(this.userForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El usuario ha sido ${message} correctamente.`,
        );
        await this.backToListUsers();
      },
    });
  }

  protected readonly DocumentView = DocumentView;
}
