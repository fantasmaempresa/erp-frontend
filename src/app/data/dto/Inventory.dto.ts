import { EntityDto } from "o2c_core";
import { ArticleDto } from "./Article.dto";
import { WarehouseDto } from "./Warehouse.dto";

export interface InventoryDto extends EntityDto {
    id: number;
    article_id?: ArticleDto;
    warehouse_id?: WarehouseDto;
    amount: number;
}