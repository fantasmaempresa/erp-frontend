import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Input()
  label = 'label';

  file!: File;

  fileURL!: string | ArrayBuffer | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};

  onTouch = () => {};

  mapFileSize = (size: number) => `${(size / 1024 / 1024).toFixed(2)} MB`;

  uploadFile(files: File[]) {
    const [file] = files;
    this.file = file;
    const reader = new FileReader();
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: Event) {
    const r = e.target as FileReader;
    this.fileURL = r.result;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {}
}
