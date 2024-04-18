import { EntityDto } from 'o2c_core';
import { GrantorDto } from './Grantor.dto';

export interface ShapeDto extends EntityDto {
  folio: string;
  notary: string;
  scriptures: string;
  property_account: string;
  signature_date: string;
  departure: string;
  inscription: string;
  sheets: string;
  took: string;
  book: string;
  operation_value: string;
  description: string;
  total: string;
  data_form: [];
  template_shape_id: number;
  procedure_id: number;
  alienator: GrantorDto;
  grantors?: {acquirers: GrantorDto[], alienators: GrantorDto[]};
}
