import { EntityDto } from "o2c_core";

export interface InversionUnitDto extends EntityDto{
    date: Date;
    factor: number;
}