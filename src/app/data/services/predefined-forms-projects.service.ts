import { Injectable } from '@angular/core';
import { AssignFolioInPhaseComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/assign-folio-in-phase/assign-folio-in-phase.component';
import { BuildPredefinedFormatComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/first-prevent-notice/build-predefined-format.component';
import { GenerateExpedientInPhaseComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/generate-expedient-in-phase/generate-expedient-in-phase.component';
import { GenerateShapeInPhaseComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/generate-shape-in-phase/generate-shape-in-phase.component';
import { ProcessingIncomeInPhaseComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/processing-income-in-phase/processing-income-in-phase.component';
import { RegistrationDataInPhaseComponent } from 'src/app/features/projects/page/predefinedForms/SimpleSale/registration-data-in-phase/registration-data-in-phase.component';
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
      name: 'Fase para crear expediente',
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
        },
        {
          title: 'Generar proyecto de escrituración',
          name: 'Proyecto de escrituración',
          nameProcess: 'DomainTransfer',
          namePhase: 'getFormatBuySell',
          generateFormat: 'generateBuySell',
        }
      ]
    },
    {
      title: 'Formas',
      name: 'Fase para agregar formas',
      value: 3,
      withFormat: false,
    },
    {
      title: 'Folio',
      name: 'Fase para asignar folio',
      value: 4,
      withFormat: false,
    },
    {
      title: 'Expediente',
      name: 'Fase para agregar archivos de expediente',
      value: 5,
      withFormat: false,
    },
    {
      title: 'Gestiones',
      name: 'Fase para agregar gestiones de documentos',
      value: 6,
      withFormat: false,
    },
    {
      title: 'Datos de registro',
      name: 'Fase para agregar datos de registro',
      value: 7,
      withFormat: false,
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
    {
      value: 3,
      component: GenerateShapeInPhaseComponent,
    },
    {
      value: 4,
      component: AssignFolioInPhaseComponent,
    },
    {
      value: 5,
      component: GenerateExpedientInPhaseComponent,
    },
    {
      value: 6,
      component: ProcessingIncomeInPhaseComponent,
    },
    {
      value: 7,
      component: RegistrationDataInPhaseComponent
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
