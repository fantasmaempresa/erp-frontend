import { viewCrud, viewLabel } from 'o2c_core';
import { RateService } from '../services/rate.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';

@viewCrud({
  classProvider: RateService,
  registerName: 'Tasa',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class RateView {
  @viewLabel('Año')
  year: number;
  @viewLabel('Limite inferior')
  lower_limit: number;
  @viewLabel('Limite superior')
  upper_limit: number;
  @viewLabel('Cuota Fija')
  fixed_fee: number;
  @viewLabel('Excedentes')
  surplus: number;

  constructor(
    year: number,
    lower_limit: number,
    upper_limit: number,
    fixed_fee: number,
    surplus: number,
  ){
    this.year = year;
    this.lower_limit = lower_limit;
    this.upper_limit = upper_limit;
    this.fixed_fee = fixed_fee;
    this.surplus = surplus;
  }
}
