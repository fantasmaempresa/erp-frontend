import { viewActions, ViewActions, viewCrud, viewLabel } from "o2c_core";
import { WarehouseService } from "../services/warehouse.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";
import { WarehouseDto } from "../dto/Warehouse.dto";
import { ActivatedRoute, Router } from "@angular/router";

const goToInitialInventory = new ViewActions<WarehouseDto>(
    async ({ row, injector }) => {
        const router = injector.get(Router);
        const route = injector.get(ActivatedRoute);
        await router.navigate(
            [
                '../',
                'initialInventory',
                (row as WarehouseDto).id,
            ],
            {
                relativeTo: route,
            }
        );
    },
    'dataset',
    {
        tooltip: 'Inventario Inicial',
        isVisible: (row) => row.type !== null,
        color: 'accent',
    },
);

const goToStock = new ViewActions<WarehouseDto>(
    async ({ row, injector }) => {
        const router = injector.get(Router);
        const route = injector.get(ActivatedRoute);
        await router.navigate(
            [
                '../',
                (row as WarehouseDto).id,
                'stock',
            ],
            {
                relativeTo: route,
            }
        );
    },
    'inventory',
    {
        tooltip: 'Abasto',
        isVisible: (row) => row.type !== null,
        color: 'accent',
    },
);

@viewCrud({
    classProvider: WarehouseService,
    registerName: 'Almacén',
    route: DEFAULT_ROUTE_CONFIGURATION,
    actions: [
        goToInitialInventory,
        goToStock,
    ],
})
export class WarehouseView {
    @viewLabel('Nombre')
    name : string;
    @viewLabel('Dirección')
    adress : string;
    @viewLabel('Tipo')
    type : string;
    @viewLabel('Estatus')
    status : string;
    constructor (
        name : string,
        adress : string,
        type : string,
        status : string,
    ){
        this.name = name;
        this.adress = adress;
        this.type = type;
        this.status = status;
    }
}