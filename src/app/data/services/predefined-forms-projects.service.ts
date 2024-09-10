import { Injectable } from '@angular/core';
import { StartFormComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/start-form/start-form.component';

@Injectable({
  providedIn: 'root',
})
export class PredefinedFormsProjectsService {
  menuPredefinedForms = [
    {
      title: 'Datos para comenzar traslado de dominio',
      name: 'Formulario Inicial Compraventa Simple',
      value: 1,
    },
  ];

  definitionPredefinedForms = [
    {
      value: 1,
      component: StartFormComponent,
    },
  ];

  constructor() {}

  getMenuPredefinedForms() {
    return this.menuPredefinedForms;
  }

  getRenderMenu(value: number) {
      return this.definitionPredefinedForms.find((item) => item.value == value);
  }
}
