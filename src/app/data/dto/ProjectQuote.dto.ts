import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface ProjectQuoteDto extends EntityDto {
  name: string;
  description: string;
  date_end: Date;
  client_id: number;
  user_id: number;
  status_quote_id: number;
}
