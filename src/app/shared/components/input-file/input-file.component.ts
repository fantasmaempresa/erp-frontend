import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.scss"],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputFileComponent,
    multi: true
  }]
})
export class InputFileComponent implements ControlValueAccessor {
  @Input()
  label = "label";

  @Input()
  accept = '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf';

  file!: File;

  fileURL!: string | ArrayBuffer | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {
  };

  onTouch = () => {
  };

  mapFileSize = (size: number) => `${(size / 1024 / 1024).toFixed(2)} MB`;

  uploadFile(files: File[]) {
    const [file] = files;
    this.file = file;
    const reader = new FileReader();
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.onChange(this.file);
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

  writeValue(file: File): void {
    this.file = file;
  }

}
