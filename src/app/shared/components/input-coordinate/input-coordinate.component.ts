import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-coordinate',
  templateUrl: './input-coordinate.component.html',
  styleUrls: ['./input-coordinate.component.scss'],
})
export class InputCoordinateComponent implements ControlValueAccessor {
  @Input()
  label = 'label';

  form!: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};

  onTouch = () => {};

  constructor() {
    this.form = new FormGroup({
      x: new FormControl(null, Validators.required),
      y: new FormControl(null, Validators.required),
    });

    this.form.valueChanges.subscribe({
      next: (value: any) => {
        this.onChange(value);
        this.onTouch();
      },
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.form.patchValue(obj);
    }
  }
}