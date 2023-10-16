import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  Output,
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

  constructor() {}

  onChange = (_: any) => {};

  onTouch = () => {};

  buildFormGroup(): UntypedFormGroup {
    const group: any = {};
    for (const control of this.formFields) {
      group[control.key] = new UntypedFormControl(
        control.value ? control.value : null,
        [Validators.required],
      );
    }
    return new UntypedFormGroup(group);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formFields.currentValue) {
      this.form = this.buildFormGroup();
      this.checkFormValueChange();
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
      this.form.patchValue({ ...value });
    }
  }

  private checkFormValueChange() {
    this.form.valueChanges.subscribe({
      next: (value) => {
        this.onChange(value);
        this.onTouch();
      },
    });
  }
}
