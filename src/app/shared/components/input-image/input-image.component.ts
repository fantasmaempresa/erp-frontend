import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
})
export class InputImageComponent implements ControlValueAccessor {
  @Input()
  label = 'label';

  fileName = '';

  imgURL!: any;

  uploadFile(files: File[]) {
    const [file] = files;
    console.log(file);
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: Event) {
    const r = e.target as FileReader;
    console.log(r);
    this.imgURL = r.result;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {}
}
