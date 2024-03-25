import { EntityDto } from "o2c_core";
import { DocumentDto } from "./Document.dto";
import { OperationsDto } from "./Operations.dto";
import { PlaceDto } from "./Place.dto";
import { ProcedureDto } from "./Procedure.dto";
import { ProcessingIncomeCommentDto } from "./ProcessingIncomeComment.dto";
import { StaffDto } from "./Staff.dto";
import { UserDto } from "./User.dto";

export interface ProcessingIncomeDto extends EntityDto {
    name: string; //descrición
    date_income: string;
    config: string;
    staff: StaffDto;
    procedure_id: number;
    operation_id: number;
    staff_id: number;
    place_id: number;
    user_id: number;
    user?: UserDto;
    place?: PlaceDto;
    operation?: OperationsDto
    procedure?: ProcedureDto;
    ProcessingIncomeComments: ProcessingIncomeCommentDto[];
    documents?: DocumentDto[];
    url_file: string;
}