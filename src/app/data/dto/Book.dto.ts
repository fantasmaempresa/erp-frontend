import { EntityDto } from 'o2c_core';
import { FolioDto } from './Folio.dto';

export interface BookDto extends EntityDto {
  name: string;
  folio_min: number;
  folio_max: number;
  date_proceeding?: Date;
}

export interface BookDetailDto extends EntityDto {
  folio_min:  number;
  folio_max:  number;
  date_proceedings:  string,
  folios:  FolioDto[];
}
