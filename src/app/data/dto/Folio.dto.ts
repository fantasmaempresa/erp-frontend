import { EntityDto } from "o2c_core";
import { UserDto } from "./User.dto";
import { BookDto } from "./Book.dto";
import { ProcedureDto } from "./Procedure.dto";

export interface FolioDto extends EntityDto{
    name: string; //instrumento
    folio_min: number;
    folio_max: number;
    book_id: number;
    procedure_id: number;
    user_id: number;   
    user?: UserDto;
    book: BookDto;
    procedure?: ProcedureDto;
}