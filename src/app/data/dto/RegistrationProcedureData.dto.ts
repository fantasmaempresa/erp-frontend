import { EntityDto } from 'o2c_core';
import { UserDto } from './User.dto';
import { DocumentDto } from './Document.dto';
import { PlaceDto } from './Place.dto';

export interface RegistrationProcedureDataDto extends EntityDto {
  date: string;
  inscription: string;
  sheets: string;
  took: string;
  book: string;
  departure: string;
  folio_real_estate: string;
  folio_electronic_merchant: string;
  nci: string;
  description: string;
  url_file: string;
  document_id: number;
  procedure_id: number;
  place_id: number;
  user_id: number;
  user?: UserDto;
  document?: DocumentDto;
  place?: PlaceDto;
  data: [
    {
      inscription: string;
      sheets: string;
      took: string;
      book: string;
      departure: string;
      folio_real_estate: string;
      folio_electronic_merchant: string;
      nci: string;
    },
  ];
}
