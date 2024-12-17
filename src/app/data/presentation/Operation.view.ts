import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { OperationProjectsService, OperationService } from '../services/operation.service';

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

  @viewLabel('Categoría de operación')
  @viewMapTo((category_operation: any) => category_operation == null ? 'sin categoría asignada' : category_operation.name)
  category_operation: any[];

  constructor(
    name: string, 
    description: string,
    category_operation: any[]
  ) {
    this.name = name;
    this.category_operation = category_operation;
    this.description = description;
  }
}

@viewCrud({
  classProvider: OperationProjectsService,
  registerName: 'Operaciones',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class OperationProjectView extends OperationView {}

