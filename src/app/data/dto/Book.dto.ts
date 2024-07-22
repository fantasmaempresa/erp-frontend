import { EntityDto } from "o2c_core";

export interface BookDto extends EntityDto{
    name: string;
    folio_min: number;
    folio_max: number;
    date_proceeding: Date;
}