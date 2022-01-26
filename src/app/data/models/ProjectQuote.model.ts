import { EntityModel } from '../../core/interfaces/EntityModel';

export interface ProjectQuote extends EntityModel {
  name: string;
  description: string;
  date_end: Date;
  client_id: number;
  user_id: number;
  status_quote_id: number;
}
