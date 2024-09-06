import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FolioControlComponent } from '../folio-control/folio-control.component';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { FolioService } from 'src/app/data/services/folio-service.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { LoaderService, MessageHelper } from 'o2c_core';

@AutoUnsubscribe()
@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent implements OnDestroy {
  form: UntypedFormGroup;
  step = 0;

  //TODO esta varibale cambiara por un servicio donde se consultará los datos del server
  reports = [
    {
      name: 'Reporte de control de folios',
      value: 1,
    },
  ];

  extension = [
    { name: 'PDF', value: 1, extension: 'pdf' },
    { name: 'Excel', value: 2, extension: 'xls' },
    { name: 'Word', value: 3, extension: 'docx' },
  ];

  reportItems = [
    {
      title: 'Reporte de control de folios',
      component: FolioControlComponent,
      value: 1,
    },
  ];

  useReport: { title: string; component: any };

  constructor(
    private fb: FormBuilder,
    private sharedData: SharedDataService,
    private folioService: FolioService,
    private loaderService: LoaderService,
  ) {
    this.form = this.fb.group({
      name: new UntypedFormControl('', [Validators.required]),
      extension: new UntypedFormControl('', [Validators.required]),
      report_id: new UntypedFormControl('', [Validators.required]),
    });

    this.useReport = { title: '', component: null };
    this.sharedData.data$.subscribe((data) => {
      this.onChildFormSubmit(data);
    });
  }

  onSubmit() {}

  goToNext() {
    console.log('next ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 1) {
      return;
    }

    this.step++;
  }

  goToPrev() {
    console.log('prev ---> ', this.step);
    // @ts-ignore
    event.preventDefault();
    if (this.step == 0) return;

    this.step--;
    setTimeout(() => {
      console.log('sleeping...');
    });
  }

  changeReport(report: any) {
    this.useReport = this.reportItems.find(
      (item) => item.value == report.value,
    )!;
  }

  onChildFormSubmit(childData: any) {

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loaderService.showFullScreenLoader();
  
    this.folioService.reportFolioControl(childData.book_id).subscribe({
      next: async (response) => {
        // @ts-ignore
        const blob = new Blob([response.body], {
          type: response.headers.get('content-type'),
        });
        const name = this.form.controls.name.value ?? 'reporte-';
        // @ts-ignore
        const filename = name + '.' +this.form.controls.extension.value?.extension;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        await MessageHelper.successMessage(
          'Reporte Generado',
          'El reporte se genero con éxito',
        );
        this.loaderService.hideLoader();
      },
      error: async () => {
        await MessageHelper.errorMessage(
          'No se puede generar el reporte en este momento intente más tarde',
        );
        this.loaderService.hideLoader();
      },
    });
  }

  ngOnDestroy() {}
}
