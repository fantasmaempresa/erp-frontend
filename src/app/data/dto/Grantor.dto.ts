import { EntityDto } from 'o2c_core';
import { StakeDto } from "./Stake.dto";

export interface GrantorDto extends EntityDto {
  name: string;
  father_last_name: string;
  mother_last_name: string;
  phone: string;
  birthdate: string;
  place_of_birth?: string;
  rfc: string;
  curp: string;
  civil_status: string;
  municipality: string;
  colony: string;
  no_int: string;
  no_ext: string;
  no_locality: string;
  locality: string;
  zipcode: string;
  occupation: string;
  type?:  number;
  beneficiary?: string;
  pivot?: {
    amount: number;
    grantor_id: number;
    procedure_id: number;
    percentage: number;
    stake_id: number;
    stake?: StakeDto;
  };
  grantor_procedure: [{
    grantor_id: number;
    procedure_id: number;
    stake_id: number;
    stake?: StakeDto;
  }]
}
