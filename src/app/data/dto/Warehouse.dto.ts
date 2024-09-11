import { EntityDto } from "o2c_core";

export interface WarehouseDto extends EntityDto {
    name: string;
    adress: string;
    type: number;
    status: string;
}