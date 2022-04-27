import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class ProcessPhase extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Descripción')
  description: string;

  form: string;

  quotes: string;

  payments: string;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    form: string,
    quotes: string,
    payments: string,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.description = description;
    this.form = form;
    this.quotes = quotes;
    this.payments = payments;
  }
}
