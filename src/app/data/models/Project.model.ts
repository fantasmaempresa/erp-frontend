import { Client } from './Client.model';
import { User } from './User.model';
import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Project extends EntityModel {
  name: string;
  description: string;
  estimate_end_date: Date;
  quotes: string;
  folio: string;
  user: User;
  client?: Client;
}
