import { viewCrud, viewLabel } from 'o2c_core';
import { RoleService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';

@viewCrud({
  classProvider: RoleService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Rol',
})
export class RoleView {
  @viewLabel('Rol')
  name: string;

  @viewLabel('Descripción')
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
