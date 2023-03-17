import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StaffService } from '../../../../data/services/staff.service';
import { map, Observable } from 'rxjs';
import { MessageHelper } from 'o2c_core';
import { StaffDto } from '../../../../data/dto/Staff.dto';
import { WorkAreaDto } from '../../../../data/dto/WorkArea.dto';
import { AreaService } from '../../../../data/services/area.service';

@Component({
  selector: 'app-staff-member-form',
  templateUrl: './staff-member-form.component.html',
  styleUrls: ['./staff-member-form.component.scss'],
})
export class StaffMemberFormComponent {
  staffMemberForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private areaSerivce: AreaService,
  ) {
    this.workAreas$ = this.areaSerivce
      .fetchAll()
      .pipe(map((areas) => areas.data));
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      staffService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (staffMember) => {
          this.staffMemberForm.addControl('id', new UntypedFormControl(''));
          this.staffMemberForm.patchValue(staffMember);
        },
      });
    }
  }

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
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
        MessageHelper.successMessage(
          '¡Éxito!',
          `El miembro ha sido ${message} correctamente.`,
        );
        await this.backToListRoles();
      },
    });
  }
}
