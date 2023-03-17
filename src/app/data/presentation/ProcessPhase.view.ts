import { viewCrud, viewLabel } from 'o2c_core';
import { ProcessPhaseService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';

@viewCrud({
  classProvider: ProcessPhaseService,
  registerName: 'Fase de Proyecto',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcessPhaseView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
