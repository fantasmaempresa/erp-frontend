import { viewCrud, viewLabel } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";
import { CategoryOperationService } from "../services/category-operation.service";

@viewCrud({
    classProvider: CategoryOperationService,
    registerName: 'Categoria de operaciónes',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class CategoryOperationView {

    @viewLabel('Nombre')
    name: string;

    @viewLabel('Descripción')
    description: string;

    constructor(
        name: string,
        description: string
    ) {
        this.name = name;
        this.description = description;
    }
}