import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputImageComponent),
      multi: true,
    },
  ],
})
//Todo terminar implementación del controlValueAccesor y control de errores
export class InputImageComponent implements ControlValueAccessor {
  @Input()
  label = 'label';

  imgName = '';

  imgURL!: string | ArrayBuffer | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};

  onTouch = () => {};

  uploadFile(files: File[]) {
    const [file] = files;
    this.imgName = file.name;
    const reader = new FileReader();
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: Event) {
    const r = e.target as FileReader;
    this.imgURL = r.result;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {}
}
