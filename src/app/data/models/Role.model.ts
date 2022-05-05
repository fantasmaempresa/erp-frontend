import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class Role extends EntityModel {
  @printLabel('Rol')
  name: string;

  @printLabel('Descripción')
  description: string;

  config: object;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    config: object,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.description = description;
    this.config = config;
  }
}
