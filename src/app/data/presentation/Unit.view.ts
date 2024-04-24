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

    @viewLabel("Año de uso")
    year: number;

    @viewLabel("valor")
    value: number;

    @viewLabel("Descripción")
    description: string;
    
    
    constructor(name: string, year: number, value: number, description: string) {
        this.name = name;
        this.year = year;
        this.value = value;
        this.description = description;
    }
}