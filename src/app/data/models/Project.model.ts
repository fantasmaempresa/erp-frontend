import { Client } from './Client.model';
import { User } from './User.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  estimate_end_date: Date;
  quotes: string;
  folio: string;
  user: User;
  client?: Client;
}
