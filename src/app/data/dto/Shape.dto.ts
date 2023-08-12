import { EntityDto } from 'o2c_core';

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
  alienating_name: string;
  alienating_street: string;
  alienating_outdoor_number: string;
  alienating_interior_number: string;
  alienating_colony: string;
  alienating_locality: string;
  alienating_municipality: string;
  alienating_entity: string;
  alienating_zipcode: string;
  alienating_phone: string;
  acquirer_name: string;
  description: string;
  total: string;
  data_form: [];
  template_shape_id: number;
  procedure_id: number;
}
