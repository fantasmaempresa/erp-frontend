import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class Process extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Descripción')
  description: string;

  config: string;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    config: string,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.description = description;
    this.config = config;
  }
}
