import { viewCrud, viewLabel } from 'o2c_core';
import { NationalConsumerPriceIndexService } from '../services/national-consumer-price-index.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';

@viewCrud({
  classProvider: NationalConsumerPriceIndexService,
  registerName: 'Precio al Consumidor Nacional',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class NationalConsumerPriceIndexView {
  @viewLabel('Año')
  year: number;

  @viewLabel('Mes')
  month: number;

  @viewLabel('Valor')
  value: number;

  constructor(
    year: number,
    month: number,
    value: number,
  ) {
    this.year = year;
    this.month = month;
    this.value = value;
  }
}
