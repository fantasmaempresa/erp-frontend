import { viewCrud, viewLabel } from 'o2c_core';
import { GeneralTemplateService } from '../services/general-template.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';

@viewCrud({
  classProvider: GeneralTemplateService,
  registerName: "Plantillas generales", 
  route : DEFAULT_ROUTE_CONFIGURATION,
})
export class GeneralTemplanteView {
  @viewLabel('Nombre de plantilla')
  name: string;

  constructor(name: string, form: string) {
    this.name = name;
  }
}
