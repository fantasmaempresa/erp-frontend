import { Component } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FolioControlComponent } from '../folio-control/folio-control.component';
import { SharedDataService } from 'src/app/data/services/shared-data.service';
import { FolioService } from 'src/app/data/services/folio-service.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent {
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
    { name: 'PDF', value: 1 },
    { name: 'Excel', value: 2 },
    { name: 'Word', value: 3 },
  ];

  reportItems = [
    { title: 'Reporte de control de folios', component: FolioControlComponent, value: 1 },
  ];

  useReport: {title: string, component: any};

  constructor(private fb: FormBuilder, private sharedData: SharedDataService, private folioService: FolioService) {
    this.form = this.fb.group({
      name: new UntypedFormControl('', [Validators.required]),
      extension: new UntypedFormControl('', [Validators.required]),
      report_id: new UntypedFormControl('', [Validators.required]),
    });

    this.useReport = {title: '', component: null};
    this.sharedData.data$.subscribe((data) => {
      this.onChildFormSubmit(data);
    })
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
    this.useReport = this.reportItems.find((item) => item.value == report.value)!; 
  }

  onChildFormSubmit(childData: any) {
    // Combina los datos del padre y del hijo
    const combinedData = {
      ...this.form.value,
      ...childData
    };

    // Envía los datos al servidor o realiza otra acción
    console.log('Datos combinados:', combinedData);
    this.folioService.reportFolioControl(combinedData).subscribe();
  }
}
