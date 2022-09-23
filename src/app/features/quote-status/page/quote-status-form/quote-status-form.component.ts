import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { QuoteStatusService } from '../../../../data/services';
import { QuoteStatusDto } from '../../../../data/dto';

@Component({
  selector: 'app-quote-status-form',
  templateUrl: './quote-status-form.component.html',
  styleUrls: ['./quote-status-form.component.scss'],
})
export class QuoteStatusFormComponent {
  quoteStatusForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
  });

  isEdit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quoteStatusService: QuoteStatusService,
  ) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
      quoteStatusService.fetch(this.route.snapshot.queryParams.id).subscribe({
        next: (user) => {
          this.quoteStatusForm.addControl('id', new UntypedFormControl(''));
          this.quoteStatusForm.patchValue(user);
        },
      });
    }
  }

  async backToListQuoteStatusList() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let request$: Observable<QuoteStatusDto>;
    if (!this.isEdit) {
      request$ = this.quoteStatusService.create(this.quoteStatusForm.value);
    } else {
      request$ = this.quoteStatusService.update(this.quoteStatusForm.value);
    }
    request$.subscribe({
      next: async () => {
        MessageHelper.successMessage(
          '¡Éxito!',
          `El estado de la cotización ha sido ${
            this.isEdit ? 'actualizado' : 'registrado'
          } correctamente.`,
        );
        await this.backToListQuoteStatusList();
      },
    });
  }
}
