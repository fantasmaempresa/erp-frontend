import { viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { GrantorService } from '../services/grantor.service';
import { StakeDto } from "../dto/Stake.dto";

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
  @viewMapTo((value: any) => {
    const types = {
      1: 'Moral',
      2: 'Física',
      bk: 'Respaldo',
    };
    return types[value as keyof typeof types];
  })
  type: string;

  @viewLabel('Participación')
  @viewMapTo((value: any) => value?.name)
  stake: StakeDto;

  @viewLabel('Beneficiario')
  @viewMapTo((value: any) => {
    const types = {
      0: 'NO BENEFICIARIO',
      1: 'BENEFICIARIO',
    };
    return types[value as keyof typeof types];
  })
  beneficiary: boolean;

  constructor(
    name: string,
    father_last_name: string,
    mother_last_name: string,
    type: string,
    stake: StakeDto,
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
