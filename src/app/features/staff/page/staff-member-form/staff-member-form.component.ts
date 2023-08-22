import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AreaServiceOld, StaffServiceOld } from '../../../../data/services';
import { map, Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { StaffDto, WorkAreaDto } from '../../../../data/dto';

@Component({
  selector: 'app-staff-member-form',
  templateUrl: './staff-member-form.component.html',
  styleUrls: ['./staff-member-form.component.scss'],
})
export class StaffMemberFormComponent {
  staffMemberForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    last_name: new UntypedFormControl('', [Validators.required]),
    mother_last_name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phone: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    nickname: new UntypedFormControl(null),
    extra_information: new UntypedFormControl(null),
    work_area_id: new UntypedFormControl(null),
    user_id: new UntypedFormControl(null),
  });

  isEdit = false;

  formErrors: any = {};

  workAreas$!: Observable<WorkAreaDto[]>;

  isDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffServiceOld,
    private areaService: AreaServiceOld,
  ) {
    const currentRoute = this.route.snapshot.routeConfig?.path;
    if (typeof currentRoute === 'undefined') {
      this.isDialog = true;
    }

    this.workAreas$ = this.areaService
      .fetchAll()
      .pipe(map((areas) => areas.data));
    const id = Number(this.route.snapshot.params.id);
    if (!isNaN(id)) {
      this.isEdit = true;
      staffService.fetch(id).subscribe({
        next: (staffMember) => {
          this.staffMemberForm.addControl('id', new UntypedFormControl(''));
          this.staffMemberForm.patchValue(staffMember);
        },
      });
    }
  }

  async backToListStaff() {
    if (this.isDialog) {
      return;
    } else {
      await this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onSubmit() {
    let request$: Observable<StaffDto>;
    if (!this.isEdit) {
      request$ = this.staffService.save(this.staffMemberForm.value);
    } else {
      request$ = this.staffService.update(this.staffMemberForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El miembro ha sido ${message} correctamente.`,
        );
        await this.backToListStaff();
      },
    });
  }
}
