import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectQuote } from '../../../../data/models/ProjectQuote.model';
import { QuoteStatusService } from '../../../../data/services/quote-status.service';
import { map, Observable } from 'rxjs';
import { QuoteStatus } from '../../../../data/models/QuoteStatus.model';
import { loadForm } from '../../../../state/dynamic-form/dynamic-form.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-quote-preview',
  templateUrl: './project-quote-preview.component.html',
  styleUrls: ['./project-quote-preview.component.scss'],
})
export class ProjectQuotePreviewComponent implements OnInit {
  HEADER_STEP = 0;

  FORM_BUILD_STEP = 1;

  FORM_FILL_STEP = 2;

  OPERATIONS_FORM_STEP = 3;

  PREVIEW_STEP = 4;

  step = 0;

  isEditing = false;

  isEditingBodyQuote = false;

  headerForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    addressee: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date_end: new FormControl(),
    status_quote_id: new FormControl(null),
    client: new FormControl({ value: null, disabled: true }),
    client_id: new FormControl({ value: null, disabled: true }),
  });

  formFill = new FormControl(null);

  quoteStatuses$!: Observable<QuoteStatus[]>;

  constructor(
    public quoteStatusService: QuoteStatusService,
    public dialogRef: MatDialogRef<ProjectQuotePreviewComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      projectQuote: ProjectQuote;
    },
  ) {
    this.quoteStatuses$ = quoteStatusService.fetchAll().pipe(
      map((quoteStatus) => {
        return quoteStatus.data;
      }),
    );

    this.store.dispatch(
      loadForm({
        form: data.projectQuote.quote.form,
        id: data.projectQuote.id,
        name: data.projectQuote.name,
        description: data.projectQuote.description,
      }),
    );
  }

  ngOnInit(): void {
    this.headerForm.patchValue(this.data.projectQuote);
    this.headerForm.get('client')?.patchValue(this.data.projectQuote.addressee);
    // this.headerForm.disable();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  goToHeaderForm() {
    this.step = this.HEADER_STEP;
  }

  goToFormFill() {
    this.step = this.FORM_FILL_STEP;
  }

  goToPreview() {
    this.step = this.PREVIEW_STEP;
    setTimeout(() => {
      // this.calculateOperations();
    }, 100);
  }
}
