import { viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ConceptService } from '../services';
import { Range, Validity } from '../dto';

@viewCrud({
  classProvider: ConceptService,
  registerName: 'Concepto',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ConceptView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
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

  @viewLabel('Cantidad')
  amount: number;

  constructor(
    name: string,
    description: string,
    formula: {
      operation: string;
      percentage: boolean;
      operable: boolean;
      is_validity: boolean;
      is_range: boolean;
      validity: Validity;
      range: Range;
    },
    amount: number,
  ) {
    this.name = name;
    this.description = description;
    this.formula = formula;
    this.amount = amount;
  }
}
