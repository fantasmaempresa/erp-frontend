import { viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { MovementTrackingService } from "../services/movement-tracking.service";
import { DEFAULT_ROUTE_CONFIGURATION} from "src/app/core/constants/routes.constants";
import { ArticleDto } from "../dto/Article.dto";
import { WarehouseDto } from "../dto/Warehouse.dto";

@viewCrud({
    classProvider: MovementTrackingService,
    registerName: 'Seguimiento de Movimientos',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class MovementTrackingView {
    @viewLabel('Identificador')
    id: number;
    @viewLabel('Id de Artículo')
    @viewMapTo((value:any) => value?.name)
    article_id?: ArticleDto;
    @viewLabel('Id de Almacén')
    @viewMapTo((value:any) => value?.name)
    warehouse_id?: WarehouseDto;
    @viewLabel('Cantidad')
    amount: number;
    @viewLabel('Razón')
    reason: string;
    constructor (
        id: number,
        article_id: ArticleDto,
        warehouse_id: WarehouseDto,
        amount: number,
        reason: string,
    ){
        this.id = id;
        this.article_id = article_id;
        this.warehouse_id = warehouse_id;
        this.amount = amount;
        this.reason = reason;
    }
}