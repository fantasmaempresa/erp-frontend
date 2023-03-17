import { viewCrud, viewLabel } from 'o2c_core';
import { AreaService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';

@viewCrud({
  classProvider: AreaService,
  registerName: 'Área de trabajo',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class AreaView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
