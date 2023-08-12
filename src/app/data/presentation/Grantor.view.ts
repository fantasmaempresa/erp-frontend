import { viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { GrantorService } from '../services/grantor.service';

@viewCrud({
  classProvider: GrantorService,
  registerName: 'Otorgantes',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class GrantorView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Apellido paterno')
  father_last_name: string;

  @viewLabel('Apellido materno')
  mother_last_name: string;

  @viewLabel('Tipo de persona')
  type: string;

  @viewLabel('Participación')
  stake: string;

  @viewLabel('Beneficiario')
  beneficiary: boolean;

  constructor(
    name: string,
    father_last_name: string,
    mother_last_name: string,
    type: string,
    stake: string,
    beneficiary: boolean,
  ) {
    this.name = name;
    this.father_last_name = father_last_name;
    this.mother_last_name = mother_last_name;
    this.type = type;
    this.stake = stake;
    this.beneficiary = beneficiary;
  }
}
