import { Client } from './Client.model';
import { User } from './User.model';
import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class Project extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Descripción')
  description: string;

  @printLabel('Fecha')
  estimate_end_date: Date;

  quotes: string;

  @printLabel('Folio')
  folio: string;

  user: User;

  client?: Client;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    estimate_end_date: Date,
    quotes: string,
    folio: string,
    user: User,
    client?: Client,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.description = description;
    this.estimate_end_date = estimate_end_date;
    this.quotes = quotes;
    this.folio = folio;
    this.user = user;
    this.client = client;
  }
}
