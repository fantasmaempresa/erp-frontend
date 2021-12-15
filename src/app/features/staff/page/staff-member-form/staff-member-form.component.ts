import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffService } from '../../../../data/services/staff.service';
import { map, Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { validationMessages } from '../../../../core/constants/validationMessages';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { Staff } from '../../../../data/models/Staff.model';
import { WorkArea } from '../../../../data/models/WorkArea.model';
import { AreaService } from '../../../../data/services/area.service';

@Component({
  selector: 'app-staff-member-form',
  templateUrl: './staff-member-form.component.html',
  styleUrls: ['./staff-member-form.component.scss'],
})
export class StaffMemberFormComponent {
  staffMemberForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    nickname: new FormControl(null),
    extra_information: new FormControl(null),
    work_area_id: new FormControl(null),
    user_id: new FormControl(null),
  });

  isEdit = false;

  formErrors: any = {};

  workAreas$!: Observable<WorkArea[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private areaSerivce: AreaService,
    private formValidationService: FormValidationService,
  ) {
    this.workAreas$ = this.areaSerivce.fetchAll().pipe(map((areas) => areas.data));
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      staffService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (staffMember) => {
          this.staffMemberForm.addControl('id', new FormControl(''));
          this.staffMemberForm.patchValue(staffMember);
        },
      });
    }
  }

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<Staff>;
    if (!this.isEdit) {
      request$ = this.staffService.save(this.staffMemberForm.value);
    } else {
      request$ = this.staffService.update(this.staffMemberForm.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        MessageHelper.successMessage('¡Éxito!', `El miembro ha sido ${message} correctamente.`);
        await this.backToListRoles();
      },
    });
  }

  logValidationErrors() {
    this.formErrors = this.formValidationService.getValidationErrors(
      this.staffMemberForm,
      validationMessages,
    );
  }
}
