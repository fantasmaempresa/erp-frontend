import { viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { InventoryService } from "../services/inventory.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";
import { ArticleDto } from "../dto/Article.dto";
import { WarehouseDto } from "../dto/Warehouse.dto";

@viewCrud({
    classProvider: InventoryService,
    registerName: 'Inventario',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class InventoryView {
    @viewLabel('Identificador')
    id: number;
    @viewLabel('Identificador de Artículo')
    @viewMapTo((value:any) => value?.name)
    article_id?: ArticleDto;
    @viewLabel('Identificador de Almacén')
    @viewMapTo((value:any) => value?.name)
    warehouse_id: WarehouseDto;
    @viewLabel('Cantidad')
    amount: number;
    constructor (
        id: number,
        article_id: ArticleDto,
        warehouse_id: WarehouseDto,
        amount: number,
    ){
        this.id = id;
        this.article_id = article_id;
        this.warehouse_id = warehouse_id;
        this.amount = amount;
    }
}