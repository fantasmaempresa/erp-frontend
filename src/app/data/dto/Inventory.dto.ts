import { EntityDto } from "o2c_core";

export interface InventoryDto extends EntityDto {
    article_id: number;
    warehouse_id: number;
    amount: number;
}