import { viewCrud, viewLabel } from "o2c_core";
import { UnitService } from "../services/unit.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: UnitService,
    route: DEFAULT_ROUTE_CONFIGURATION,
    registerName: 'Unidades',
})
export class UnitView {
    @viewLabel("Nombre")
    name: string;

    @viewLabel("valor")
    value: number;

    
    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}