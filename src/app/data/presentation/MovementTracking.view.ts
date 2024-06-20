import { viewCrud, viewLabel } from "o2c_core";
import { MovementTrackingService } from "../services/movement-tracking.service";
import { DEFAULT_ROUTE_CONFIGURATION} from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: MovementTrackingService,
    registerName: 'Seguimiento de Movimientos',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class MovementTrackingView {
    @viewLabel('Identificador')
    id: number;
    @viewLabel('Id de Artículo')
    article_id: number;
    @viewLabel('Id de Almacén')
    warehouse_id: number;
    @viewLabel('Cantidad')
    amount: number;
    @viewLabel('Razón')
    reason: string;
    constructor (
        id: number,
        article_id: number,
        warehouse_id: number,
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