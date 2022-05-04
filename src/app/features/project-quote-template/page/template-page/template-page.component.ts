import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { selectDynamicForm } from '../../../../state/dynamic-form/dynamic-form.selector';
import { catchError, lastValueFrom, take, throwError } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import Swal from 'sweetalert2';
import { QuoteTemplateService } from '../../../../data/services/quote-template.service';

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss'],
})
export class TemplatePageComponent implements OnInit {
  FORM_BUILD_STEP = 0;

  CONCEPTS_ASSIGNMENT = 1;

  PREVIEW_STEP = 2;

  step = 0;

  templateForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  previewForm: FormControl = new FormControl(null);

  operationsForm = new FormGroup({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private templateQuotesService: QuoteTemplateService,
  ) {}

  ngOnInit(): void {
    console.log('Hi on ngOnInit');
  }

  async back() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToFormBuildStep() {
    this.step = this.FORM_BUILD_STEP;
  }

  goToPreview() {
    this.step = this.PREVIEW_STEP;
  }

  goToConceptsAssignment() {
    this.step = this.CONCEPTS_ASSIGNMENT;
  }

  submit() {
    this.store
      .select(selectDynamicForm)
      .pipe(take(1))
      .subscribe((form) => {
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
          .then((result) => {
            if (result) {
              MessageHelper.successMessage('Exito', 'Plantilla guardada con éxito');
              this.router.navigate(['../'], { relativeTo: this.route });
            }
          })
          .catch(() => MessageHelper.errorMessage('Ha ocurrido un error, intentelo mas tarde'));
        // console.log(quote);
        // this.projectQuoteService.save(quote).subscribe((val) => {
        //   console.log(val);
        //   MessageHelper.successMessage('Éxito', 'Cotización guardada');
        //   this.router.navigate(['../'], { relativeTo: this.route });
        // });
      });
  }
}
