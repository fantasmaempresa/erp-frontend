import { viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ProjectQuoteServiceNew } from "../services";

@viewCrud({
  classProvider: ProjectQuoteServiceNew,
  registerName: 'Cotizaciones',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProjectQuoteView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
