import { EntityDto } from '../../core/interfaces/Entity.dto';
import { ClientDto } from './Client.dto';
import { Formfield } from './Formfield.dto';
import { Operations } from '../models/Operations.model';

export interface ProjectQuoteDto extends EntityDto {
  addressee: string;
  name: string;
  description: string;
  date_end: Date;
  client: ClientDto;
  client_id: number;
  user_id: number;
  status_quote_id: number;
  quote: {
    form: Formfield<any>[];
    operations?: Operations;
    result: Result;
  };
  template_quote_id: number;
}

export interface Result {
  operation_total: OperationTotal;
  operation_fields: OperationField[];
}

export interface OperationField {
  name: string;
  total: number;
  description: any[];
  original_value: number;
}

export interface OperationTotal {
  name: string;
  total: number;
  subtotal: number;
  description: any[];
}
