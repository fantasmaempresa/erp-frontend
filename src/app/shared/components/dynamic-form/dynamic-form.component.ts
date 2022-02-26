import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';
import { Store } from '@ngrx/store';
import { selectDynamicForm, selectStatus } from '../../../state/dynamic-form/dynamic-form.selector';
import { Observable, Subscription } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { setValuesToFields } from '../../../state/dynamic-form/dynamic-form.actions';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formFields!: Formfield<any>[];

  form: FormGroup = new FormGroup({});

  payLoad = '';

  fields$!: Observable<Formfield<any>[]>;

  formStatus$!: Observable<'EDITABLE' | 'NEW'>;

  isLoading = false;

  formChangesSubscription = Subscription.EMPTY;

  constructor(private formfieldService: FormfieldControlService, private store: Store) {
    this.fields$ = store.select(selectDynamicForm);
    this.formStatus$ = store.select(selectStatus);
    // combineLatest([this.fields$, this.formStatus$]).subscribe(([fields, status]) => {
    //   console.log(fields, status);
    //   this.formFields = fields;
    //   this.formChangesSubscription.unsubscribe();
    //   if (status !== 'EDITABLE') {
    //     this.isLoading = true;
    //     this.form = new FormGroup({});
    //     fields.forEach((control) => {
    //       this.form.setControl(control.key, new FormControl(''));
    //     });
    //   }
    //   this.formChangesSubscription = this.form.valueChanges.subscribe((val) => {
    //     console.log(val);
    //     this.store.dispatch(setValuesToFields({ fields: val }));
    //   });
    // });
    // this.fields$.subscribe((data) => {
    //   this.formFields = data;
    //   this.isLoading = true;
    //   this.formChangesSubscription.unsubscribe();
    //   this.form = new FormGroup({});
    //   data.forEach((control) => {
    //     this.form.setControl(control.key, new FormControl(''));
    //   });
    //   this.formChangesSubscription = this.form.valueChanges.subscribe((val) => {
    //     console.log(val);
    //     // this.store.dispatch(setValuesToFields({ fields: val }));
    //   });
    //   // this.isLoading = false;
    // });
  }

  createOption() {
    return new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.formChangesSubscription = this.form.valueChanges.subscribe((val) => {
      this.store.dispatch(setValuesToFields({ fields: val }));
    });
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges) {
    // if (!changes.formFields.firstChange) {
    this.createForm(this.formFields);
    // }
  }

  createForm(controls: Formfield<any>[]) {
    for (const control of controls) {
      this.form.addControl(control.key, new FormControl(control.value));
    }
  }
}
