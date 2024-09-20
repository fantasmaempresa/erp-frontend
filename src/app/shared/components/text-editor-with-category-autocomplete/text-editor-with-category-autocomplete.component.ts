import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { Editor, NgxEditorModule, schema, Validators } from 'ngx-editor';
import { debounceTime, Subscription } from 'rxjs';

export interface CategoryOptions {
  name: string;
  sheets: string[];
}

export interface EditorOptions {
  name: string;
  controlName: string;
}

@Component({
  selector: 'app-text-editor-with-category-autocomplete',
  standalone: true,
  imports: [CommonModule, NgxEditorModule, ReactiveFormsModule],
  templateUrl: './text-editor-with-category-autocomplete.component.html',
  styleUrls: ['./text-editor-with-category-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextEditorWithCategoryAutocompleteComponent,
      multi: true,
    },
  ],
})
export class TextEditorWithCategoryAutocompleteComponent
  implements OnChanges, ControlValueAccessor, OnDestroy
{
  @Input() editorArray: EditorOptions[] = [];

  @Input() categories: CategoryOptions[] = [];

  editors: Editor[] = [];

  selectedEditor: Editor | null = null;

  form: UntypedFormGroup = new UntypedFormGroup({});

  onChange: any = () => {};

  onTouch: any = () => {};

  private subscription!: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      setTimeout(() => {
        this.form.patchValue(obj);
      }, 350);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setCurrentEditor(editor: Editor) {
    this.selectedEditor = editor;
  }

  addSheet(sheet: string) {
    if (this.selectedEditor) {
      this.selectedEditor.commands
        .insertText(sheet)
        .focus()
        .scrollIntoView()
        .exec();
    }
  }

  private _createNewEditor(): Editor {
    return new Editor({
      schema,
    });
  }

  ngOnChanges(): void {
    this.editors = this.editorArray.map(() => this._createNewEditor());
    this._buildForm();
  }

  private _buildForm() {
    this.form = new UntypedFormGroup({});
    this.editorArray.forEach(({ controlName: key }) => {
      this.form.addControl(key, new FormControl('', Validators.required()));
    });

    this.subscription = this.form.valueChanges
      .pipe(debounceTime(600))
      .subscribe(() => {
        this._updateValue();
      });
  }

  private _updateValue() {
    this.onChange(this.form.getRawValue());
    this.onTouch();
  }
}
