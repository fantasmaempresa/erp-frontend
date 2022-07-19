import { EntityModel } from '../../core/interfaces/EntityModel';
import { Client } from './Client.model';
import { Formfield } from './Formfield.model';
import { Operations } from './Operations.model';

export interface ProjectQuote extends EntityModel {
  addressee: string;
  name: string;
  description: string;
  date_end: Date;
  client: Client;
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
