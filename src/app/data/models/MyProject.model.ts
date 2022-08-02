import { Client } from './Client.model';
import { User } from './User.model';
import { Project } from './Project.model';

export class MyProjectModel extends Project {
  name: string;

  description: string;

  estimate_end_date: Date;

  quotes: string;

  folio: string;

  config: any;

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
    client: Client,
    config: any,
  ) {
    super(
      id,
      created_at,
      updated_at,
      name,
      description,
      estimate_end_date,
      quotes,
      folio,
      user,
      client,
    );
    this.name = name;
    this.description = description;
    this.estimate_end_date = estimate_end_date;
    this.quotes = quotes;
    this.folio = folio;
    this.config = config;
    this.user = user;
    this.client = client;
  }
}
