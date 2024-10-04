import { Injectable } from '@angular/core';
import { BuildPredefinedFormatComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/first-prevent-notice/build-predefined-format.component';
import { StartFormComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/start-form/start-form.component';

export interface ReportPredefinedForms {
  title: string;
  name: string;
  nameProcess: string;
  namePhase: string;
  generateFormat: string;
}

export interface ItemPredefinedForm {
  title: string;
  name: string;
  value: number;
  withFormat: boolean;
  formats?: ReportPredefinedForms[];
}

export interface DefinitionPredefinedForms {
  value: number;
  component: any;
}

@Injectable({
  providedIn: 'root',
})
export class PredefinedFormsProjectsService {

  menuPredefinedForms: ItemPredefinedForm[] = [
    {
      title: 'Datos para comenzar traslado de dominio',
      name: 'Formulario Inicial Compraventa Simple',
      value: 1,
      withFormat: false,
    },
    {
      title: 'Generar formato',
      name: 'Fase para generar formato de procesos',
      value: 2,
      withFormat: true,
      formats: [
        {
          title: 'Datos para generar primer aviso preventivo',
          name: 'Primer aviso preventivo',
          nameProcess: 'DomainTransfer',
          namePhase: 'generateFirstPreventiveNotice',
          generateFormat: 'getFormatFirstPreventiveNotice',
        }
      ]
    },
  ];


  definitionPredefinedForms: DefinitionPredefinedForms[] = [
    {
      value: 1,
      component: StartFormComponent,

    },
    {
      value: 2,
      component: BuildPredefinedFormatComponent,
    },
  ];

  constructor() { }

  getMenuPredefinedForms() {
    return this.menuPredefinedForms;
  }

  getRenderMenu(value: number) {
    return this.definitionPredefinedForms.find((item) => item.value == value);
  }
}
