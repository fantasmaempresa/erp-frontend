import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class RoleView {
  @printLabel('Rol')
  name: string;

  @printLabel('Descripción')
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
