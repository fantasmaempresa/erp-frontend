import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Formfield } from '../../../../data/dto';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PredefinedFormsProjectsService } from 'src/app/data/services/predefined-forms-projects.service';

@Component({
  selector: 'app-preview-form-builder',
  templateUrl: './preview-form-builder.component.html',
  styleUrls: ['./preview-form-builder.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreviewFormBuilderComponent),
      multi: true,
    },
  ],
})
export class PreviewFormBuilderComponent
  implements OnChanges, ControlValueAccessor
{
  @Input()
  formFields: Formfield<any>[] = [];

  form: UntypedFormGroup = new UntypedFormGroup({});
  renderPreview: boolean = false;
  buildPreview: boolean = false;
  //@ts-ignore
  renderPredefinedForm: { value: number; component: any };

  constructor(private menuForms: PredefinedFormsProjectsService) {}

  onChange = (_: any) => {};

  onTouch = () => {};

  buildFormGroup(): UntypedFormGroup | any {
    console.log(
      'PreviewFormBuilderComponent formFields ---> ',
      this.formFields,
      (this.formFields.length > 0 &&
        //@ts-ignore
        typeof this.formFields?.type_form === 'undefined') || (typeof this.formFields?.type_form != "undefined" && this.formFields?.type_form == 1),
    );
    if (
    (this.formFields.length > 0 &&
      //@ts-ignore
      typeof this.formFields?.type_form === 'undefined') || (typeof this.formFields?.type_form != "undefined" && this.formFields?.type_form == 1)
    ) {
      console.log('phase 1 entry --->');
      const group: any = {};
      this.formFields =
        //@ts-ignore
        typeof this.formFields.form === "undefined"
          ? this.formFields
          : //@ts-ignore
            this.formFields.form;
      for (const control of this.formFields) {
        group[control.key] = new UntypedFormControl(
          control.value ? control.value : null,
          [Validators.required],
        );
      }
      this.form = new UntypedFormGroup(group);
      this.checkFormValueChange();
      this.buildPreview = true;
      //@ts-ignore
    } else if (typeof this.formFields?.type_form != "undefined" && this.formFields?.type_form == 2) { 
      console.log('phase 2 entry --->');

      //@ts-ignore
      this.renderPredefinedForm = this.menuForms.getRenderMenu(
      //@ts-ignore
      this.formFields.form.value,
      );
      this.renderPreview = true;
    }
  } 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formFields.currentValue) {
      this.buildFormGroup();
      console.log('formFields ---> ', this.formFields);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: Object): void {
    if (value) {
      console.log('write - value ---> ', value);
      this.form.patchValue({ ...value });
    }
  }

  private checkFormValueChange() {
    this.form.valueChanges.subscribe({
      next: (value) => {
        console.log('checkFormValueChange -- value ---> ', value);
        this.onChange(value);
        this.onTouch();
      },
    });
  }
}
