import { EntityDto } from "o2c_core";

export interface MovementTrackingDto extends EntityDto {
    id: number;
    article_id: number;
    warehouse_id: number;
    amount: number;
    reason: string;
}