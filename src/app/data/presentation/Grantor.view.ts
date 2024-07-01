import { ViewActions, viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { GrantorDto } from "../dto/Grantor.dto";
import { StakeDto } from "../dto/Stake.dto";
import { GrantorService } from '../services/grantor.service';
import { ActivatedRoute, Router } from "@angular/router";

const goToGrantorLink = new ViewActions<GrantorDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as GrantorDto).id, 'grantorsLink'], {
      relativeTo: route,
    });
  },
  'people',
  {
    tooltip: 'Ver Representantes',
    //@ts-ignore
    isVisible: (row) => row && row.type == 1,
    color: 'accent',
  },
);

@viewCrud({
  classProvider: GrantorService,
  registerName: 'Otorgantes',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [goToGrantorLink],
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
      3: 'Cujus',
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
