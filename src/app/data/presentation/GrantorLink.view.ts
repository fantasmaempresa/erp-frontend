import { viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { StakeDto } from "../dto/Stake.dto";
import { GrantorLinkService } from "../services/grantor-link.service";

@viewCrud({
  classProvider: GrantorLinkService,
  registerName: 'Representantes legales',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class GrantorLinkView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Apellido paterno')
  father_last_name: string;

  @viewLabel('Apellido materno')
  mother_last_name: string;

  @viewLabel('RFC')
  rfc: string;

  @viewLabel('Participación')
  @viewMapTo((value: any) => value?.name)
  stake: StakeDto;


  constructor(
    name: string,
    father_last_name: string,
    mother_last_name: string,
    rfc: string,
    stake: StakeDto,
  ) {
    this.name = name;
    this.father_last_name = father_last_name;
    this.mother_last_name = mother_last_name;
    this.rfc = rfc;
    this.stake = stake;
  }
}
