import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from 'o2c_core';
import { Observable } from 'rxjs';
import { ReminderDto } from 'src/app/data/dto/Reminder.dto';
import { UserView } from 'src/app/data/presentation';
import { ProcedureView } from 'src/app/data/presentation/Procedure.view';
import { ProcessingIncomeView } from 'src/app/data/presentation/ProcessingIncome.view';
import { ReminderService } from 'src/app/data/services/reminder.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent {

  form: UntypedFormGroup;

  processingIncomeProvider = ProcessingIncomeView;
  processingIncomeProviderView = true;
  procedureProvider = ProcedureView;
  procedureProviderView = true;
  userProvider = UserView;

  PROCESSING_INCOME_CONFIG = 1;
  PROCEDURE_CONFIG = 2;
  GENERAL_CONFIG = 3;

  isEdit = false;
  isDialog = false;


  types = [
    {
      label: 'Recordatorio para gestión',
      value: this.PROCESSING_INCOME_CONFIG
    },
    {
      label: 'Recordatorio para expediente',
      value: this.PROCEDURE_CONFIG
    },
    {
      label: 'Recordatorio general',
      value: this.GENERAL_CONFIG
    }
  ];

  constructor(
    public reminderServide: ReminderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = new UntypedFormGroup(
      {
        name: new UntypedFormControl('', Validators.required),
        message: new UntypedFormControl('', Validators.required),
        config: new UntypedFormGroup(
          {            
            user_id: new UntypedFormControl(null),
          }
        ),
        type: new UntypedFormControl('', Validators.required),
        expiration_date: new UntypedFormControl('', Validators.required),
        processing_income_id: new UntypedFormControl(null),
        procedure_id: new UntypedFormControl(null),

      }
    );

    this.form.get('type')?.valueChanges.subscribe({
      next: (value) => {
        if (value === this.PROCESSING_INCOME_CONFIG) {
          this.processingIncomeProviderView = true;
          this.procedureProviderView = false;
        } else if (value === this.PROCEDURE_CONFIG) {
          this.processingIncomeProviderView = false;
          this.procedureProviderView = true;
        } else if (value === this.GENERAL_CONFIG) {
          this.processingIncomeProviderView = false;
          this.procedureProviderView = false;
        }
      }
    });

    const data = this.route.snapshot.routeConfig?.data;
    let procedure_id = NaN;
    let idProcessingIncome = NaN;
    let id = NaN;
    id = Number(this.route.snapshot.params.idReminder);
    procedure_id = Number(this.route.snapshot.params.procedureId);
    idProcessingIncome = Number(this.route.snapshot.params.idProcessingIncome);

    console.log('buscando el orignen --> ', data, this.route.snapshot.params, id, procedure_id, idProcessingIncome);



    if (!isNaN(procedure_id)) {
      this.form.get('procedure_id')?.setValue(procedure_id);
      this.form.get('type')?.setValue(this.PROCEDURE_CONFIG);
    } else if(!isNaN(idProcessingIncome)) {
      this.form.get('processing_income_id')?.setValue(idProcessingIncome);
      this.form.get('type')?.setValue(this.PROCESSING_INCOME_CONFIG);
    }else {
      this.form.get('type')?.setValue(this.GENERAL_CONFIG);
    }

    if (!isNaN(id)) {
      this.isEdit = true;
      this.reminderServide.fetch(id).subscribe({
        next: (item) => {
          this.form.addControl('id', new UntypedFormControl(''));
          this.form.patchValue(item);
        },
      });
    }

  }


  async back() {
    if(!this.isDialog)
      await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if(this.form.invalid)
      return;

    let request$: Observable<ReminderDto>;
    if (!this.isEdit) {
      request$ = this.reminderServide.save(this.form.value);
    } else {
      request$ = this.reminderServide.update(this.form.value);
    }
    request$.subscribe({
      next: async () => {
        let message = this.isEdit ? 'actualizado' : 'registrado';
        await MessageHelper.successMessage(
          '¡Éxito!',
          `El usuario ha sido ${message} correctamente.`,
        );
        await this.back();
      },
      error: async (error) => {
        console.log(error);
        if (error.error.code != null && error.error.code == 422) {
          await MessageHelper.errorMessage(error.error.error);
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

}
