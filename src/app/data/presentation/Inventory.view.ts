import { viewCrud, viewLabel } from "o2c_core";
import { InventoryService } from "../services/inventory.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: InventoryService,
    registerName: 'Inventario',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class InventoryView {
    @viewLabel('Identificador')
    id: number;
    @viewLabel('Identificador de Artículo')
    article_id: number;
    @viewLabel('Identificador de Almacén')
    warehouse_id: number;
    @viewLabel('Cantidad')
    amount: number;
    constructor (
        id: number,
        article_id: number,
        warehouse_id: number,
        amount: number,
    ){
        this.id = id;
        this.article_id = article_id;
        this.warehouse_id = warehouse_id;
        this.amount = amount;
    }
}