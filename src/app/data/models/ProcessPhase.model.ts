import { EntityModel } from '../../core/interfaces/EntityModel';
import {
  mapToHTML,
  printLabel,
} from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class ProcessPhase extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Descripción')
  description: string;

  @mapToHTML(
    (form: any[]) =>
      "<div class='d-flex flex-column' style='padding: 1.5rem; row-gap: 1rem'>" +
      form
        .map(
          ({ controlType, label }) =>
            `<div style="flex: 1 1; border-radius: 8px;
               padding: 1rem 2rem; background: #d7d7d7;
               font-weight: 500;
               color: var(--accent-color)"> ${label} [${controlType}] </div>`,
        )
        .join('') +
      '</div>',
  )
  @printLabel('Formulario')
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
