import { Component, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { FORM_CLAZZ, FormComponent } from 'o2c_core';
import { GrantorView } from 'src/app/data/presentation/Grantor.view';
import { OperationView } from 'src/app/data/presentation/Operation.view';
import { StakeAssignGrantorTable } from 'src/app/data/presentation/Procedure.view';
import { StakeView } from 'src/app/data/presentation/Stake.view';

@AutoUnsubscribe()
@Component({
  selector: 'app-start-form',
  templateUrl: './start-form.component.html',
  styleUrls: ['./start-form.component.scss'],
  providers: [
    {
      provide: FORM_CLAZZ,
      useValue: StakeAssignGrantorTable,
    },
  ],
})
export class StartFormComponent implements OnDestroy {

  operationProvider = OperationView;
  grantorProvider = GrantorView;
  stakeProvider = StakeView;

  form: UntypedFormGroup;

  formId = ''; 

  private _listFormBuilder!: FormComponent;

  public get formComponent(): FormComponent {
    return this._listFormBuilder;
  }

  @ViewChild(FormComponent)
  public set formComponent(value: FormComponent) {
    console.log('seteando formbuilder ---> ', value);
    this._listFormBuilder = value;
  }

  constructor() { 
    this.form = new UntypedFormGroup({
      expedient: new UntypedFormControl('', [Validators.required]),
    });
  }

  onSubmit(){
    console.log(this.form.value);
  }

  ngOnDestroy(): void {}
}
