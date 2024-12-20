import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageHelper } from 'o2c_core';
import { catchError, lastValueFrom, take, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Formfield, QuoteTemplate } from '../../../../data/dto';
import {
  QuoteTemplateService
} from '../../../../data/services';
import {
  emptyForm,
  selectDynamicForm,
  selectDynamicFormEssentialData,
} from '../../../../state/dynamic-form';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss'],
})
export class TemplatePageComponent implements OnInit, OnDestroy {
  FORM_BUILD_STEP = 0;

  CONCEPTS_ASSIGNMENT = 1;

  PREVIEW_STEP = 2;

  step = 0;

  templateForm: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(),
  });

  previewForm: UntypedFormControl = new UntypedFormControl(null);

  operationsForm = new UntypedFormGroup({});

  isEdit = false;

  loadedTemplate!: QuoteTemplate;

  formFields!: Formfield<any>[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private templateQuotesService: QuoteTemplateService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      this.templateQuotesService
        .fetch(this.route.snapshot.queryParams.id)
        .subscribe({
          next: (quoteTemplate) => {
            console.log(quoteTemplate);
            this.loadedTemplate = quoteTemplate;
          },
        });
    }
  }

  ngOnInit(): void {
    console.log('Hi on ngOnInit');
  }

  ngOnDestroy() {
    this.store.dispatch(emptyForm());
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToFormBuildStep() {
    this.step = this.FORM_BUILD_STEP;
  }

  goToPreview() {
    this.step = this.PREVIEW_STEP;
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((data) => (this.formFields = data));
    console.log(this.operationsForm.value);
  }

  goToConceptsAssignment() {
    this.step = this.CONCEPTS_ASSIGNMENT;
  }

  submit() {
    this.store
      .select(selectDynamicFormEssentialData)
      .pipe(take(1))
      .subscribe({
        next: (form) => {
          console.log(form);
          if (this.isEdit) {
            this.updateTemplate(form);
          } else {
            this.saveTemplate(form);
          }
        },
      });
  }

  saveTemplate(form: any) {
    Swal.fire({
      title: 'Guardar plantilla',
      icon: 'question',
      input: 'text',
      text: 'Ponle un titulo a la plantilla',
      confirmButtonColor: '#dfc356',
      focusConfirm: false,
      confirmButtonText: 'Guardar',
      preConfirm: (name) => {
        const template: any = {
          name,
          form,
          operations: this.operationsForm.getRawValue(),
        };
        let request = this.templateQuotesService
          .save(template)
          .pipe(catchError((err) => throwError(err)));
        return lastValueFrom(request);
      },
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await MessageHelper.successMessage(
            'Exito',
            'Plantilla guardada con éxito',
          );
          await this.router.navigate(['../'], { relativeTo: this.route });
        }
      })
      .catch(async () =>
        MessageHelper.errorMessage('Ha ocurrido un error, intentelo mas tarde'),
      );
  }

  updateTemplate(form: any) {
    if (!this.loadedTemplate) {
      return;
    }
    Swal.fire({
      title: 'Actualizar plantilla',
      icon: 'question',
      input: 'text',
      text: 'Ponle un titulo a la plantilla',
      confirmButtonColor: '#dfc356',
      focusConfirm: false,
      confirmButtonText: 'Actualizar',
      inputValue: this.loadedTemplate.name,
      preConfirm: (name) => {
        const template: any = {
          id: this.loadedTemplate?.id,
          name,
          form,
          operations: this.operationsForm.getRawValue(),
        };
        let request = this.templateQuotesService
          .update(template)
          .pipe(catchError((err) => throwError(err)));
        return lastValueFrom(request);
      },
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await MessageHelper.successMessage(
            'Exito',
            'Plantilla actualizada con éxito',
          );
          await this.router.navigate(['../'], { relativeTo: this.route });
        }
      })
      .catch(async () =>
        MessageHelper.errorMessage('Ha ocurrido un error, intentelo mas tarde'),
      );
  }
}
