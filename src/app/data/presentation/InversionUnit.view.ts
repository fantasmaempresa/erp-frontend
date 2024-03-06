import { viewCrud, viewLabel } from 'o2c_core';
import { InversionUnitService } from '../services/inversion-unit.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';

@viewCrud({
  classProvider: InversionUnitService,
  registerName: 'Unidad de inversión',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class InversionUnitView {
  @viewLabel('Fecha')
  date: Date;
  @viewLabel('Factor')
  factor: number;

  constructor(date: Date, factor: number) {
    this.date = date;
    this.factor = factor;
  }
}
