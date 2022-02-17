import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormfieldControlService } from '../../../core/services/formfield-control.service';
import { Store } from '@ngrx/store';
import {
  selectDynamicForm,
  selectDynamicFormId,
  selectDynamicFormName,
} from '../../../state/dynamic-form/dynamic-form.selector';
import { lastValueFrom, Observable } from 'rxjs';
import { Formfield } from '../../../data/models/Formfield.model';
import { removeField } from '../../../state/dynamic-form/dynamic-form.actions';
import { MessageHelper } from '../../helpers/MessageHelper';
import Swal from 'sweetalert2';
import { TemplateQuotesService } from '../../../data/services/template-quotes.service';
import { TemplateQuotes } from '../../../data/models/TemplateQuotes.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnDestroy {
  form: FormGroup = new FormGroup({});

  payLoad = '';

  fields$!: Observable<Formfield<any>[]>;

  isLoading = false;

  formFields!: Formfield<any>[];

  templateId = 0;

  templateName = '';

  dynamicFormId$!: Observable<number>;

  dynamicFormName$!: Observable<string>;

  constructor(
    private formfieldService: FormfieldControlService,
    private store: Store,
    private templateQuotesService: TemplateQuotesService,
  ) {
    this.fields$ = store.select(selectDynamicForm);
    this.fields$.subscribe((data) => {
      this.formFields = data;
      this.isLoading = true;
      data.forEach((control) => {
        this.form.setControl(control.key, new FormControl(''));
      });
      this.isLoading = false;
    });
    this.dynamicFormId$ = store.select(selectDynamicFormId);
    this.dynamicFormId$.subscribe((id) => (this.templateId = id));
    this.dynamicFormName$ = store.select(selectDynamicFormName);
    this.dynamicFormName$.subscribe((name) => (this.templateName = name));
  }

  onSubmit() {
    const template: TemplateQuotes = {
      id: this.templateId,
      name: this.templateName,
      form: this.formFields,
    };
    if (this.templateId !== 0) {
      this.templateQuotesService.update(template).subscribe((data) => console.log(data));
      return;
    }

    if (this.templateId === 0) {
      // TODO: Modificar para utilizar un dialog de angular
      Swal.fire({
        title: 'Guardar plantilla',
        icon: 'question',
        input: 'text',
        text: 'Ponle un titulo a la plantilla',
        confirmButtonColor: '#dfc356',
        focusConfirm: false,
        confirmButtonText: 'Guardar',
        preConfirm: (name) => {
          template.name = name;
          let request = this.templateQuotesService.save(template);
          return lastValueFrom(request);
        },
      }).then(() => {
        MessageHelper.successMessage('Exito', 'Plantilla guardada con éxito');
      });
    }
  }

  createOption() {
    return new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  removeField(formField: Formfield<any>) {
    console.log(formField);
    this.store.dispatch(removeField({ payload: formField }));
  }

  ngOnDestroy(): void {}
}
