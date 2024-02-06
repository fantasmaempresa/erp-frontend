import { viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { StakeService } from '../services/stake.service';

@viewCrud({
  classProvider: StakeService,
  registerName: 'Participación',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class StakeView {
  @viewLabel('Nombre')
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
