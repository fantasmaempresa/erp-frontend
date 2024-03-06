import { viewCrud, viewLabel } from "o2c_core";
import { TypeDisposalOperationService } from "../services/type-disposal-operation.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: TypeDisposalOperationService,
    registerName: "Operaciones de eliminación",
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class TypeDisposalOperationView {
    @viewLabel("Tipo")
    type: string;

    constructor(type: string) {
        this.type = type;
    }
}