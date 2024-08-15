import { EntityDto } from "o2c_core";

export interface WarehouseDto extends EntityDto {
    id: number;
    name: string;
    address: string;
    type: string;
    status: string;
}