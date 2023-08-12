import { EntityDto } from 'o2c_core';

export interface GrantorDto extends EntityDto {
  name: string;
  father_last_name: string;
  mother_last_name: string;
  type: string;
  stake: string;
  beneficiary: string;
}
