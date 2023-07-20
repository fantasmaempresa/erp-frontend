import { viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { OperationService } from '../services/operation.service';

@viewCrud({
  classProvider: OperationService,
  registerName: 'Operacion',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class OperationView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
