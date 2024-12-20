import { Component, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientView } from 'src/app/data/presentation';
import { ClientDto } from '../../../../data/dto';
import {
  AbstractSubformComponent
} from '../../../../shared/components';
import { OperationView } from 'src/app/data/presentation/Operation.view';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-project-quote-form',
  templateUrl: './project-quote-form.component.html',
  styleUrls: ['./project-quote-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectQuoteFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProjectQuoteFormComponent),
      multi: true,
    },
  ],
})
export class ProjectQuoteFormComponent extends AbstractSubformComponent {
  clients!: ClientDto[];
  editor: Editor;
  editorDescription: Editor;
  placeholderDescription: string = 'Descripción';
  clientProvider = ClientView;
  operationProvider = OperationView;

  constructor(public dialog: MatDialog) {
    super();
    this.formGroup = new UntypedFormGroup({
      addressee: new UntypedFormControl('', []),
      client: new UntypedFormControl({ value: null, disabled: false }),
      client_id: new UntypedFormControl({ value: null, disabled: false }),
      operations: new UntypedFormControl({ value: null, disabled: false }),
      date_end: new UntypedFormControl({ value: '', disabled: true }),
      description: new UntypedFormControl('', []),
      observation: new UntypedFormControl('', []),
      name: new UntypedFormControl('', []),
      status_quote_id: new UntypedFormControl(null),
    });
    this.editor = new Editor();
    this.editorDescription = new Editor();

    let text = '<p> <b>Descripción del inmueble:</b> <br>';
    text += '<b>Enajenante:</b> <br>';
    text += '<b>Adquiriente:</b> </p>';
    this.formGroup.get('description')?.setValue(text);
    
  }
  registerOnChange(onChange: any): void {
    const sub = this.formGroup.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }
  
}
