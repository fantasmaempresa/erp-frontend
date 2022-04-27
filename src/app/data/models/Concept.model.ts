import { EntityModel } from '../../core/interfaces/EntityModel';

export interface Concept extends EntityModel {
  name: string;
  description: string;
  formula: {
    operation: string;
    percentage: boolean;
    operable: boolean;
    is_validity: boolean;
    is_range: boolean;
    validity: Validity;
    range: Range;
  };
  amount: number;
}

export interface Validity {
  apply: boolean;
  is_date: boolean;
  is_range: boolean;
  amount: number;
  between: any[];
}

export interface Range {
  apply: boolean;
  between: any[];
}
