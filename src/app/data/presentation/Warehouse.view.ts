import { viewCrud, viewLabel } from "o2c_core";
import { WarehouseService } from "../services/warehouse.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: WarehouseService,
    registerName: 'Almacén',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class WarehouseView {
    @viewLabel('Identificador')
    id : number;
    @viewLabel('Nombre')
    name : string;
    @viewLabel('Dirección')
    address : string;
    @viewLabel('Tipo')
    type : string;
    @viewLabel('Estatus')
    status : string;
    constructor (
        id : number,
        name : string,
        address : string,
        type : string,
        status : string,
    ){
        this.id = id;
        this.name = name;
        this.address = address;
        this.type = type;
        this.status = status;
    }
}