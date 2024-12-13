import { ViewsModule, viewCrud, viewLabel } from "o2c_core";
import { LineService } from "../services/line.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: LineService,
    registerName: 'Línea',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class LineView {
    @viewLabel('Linea')
    line : number;
    constructor(
        line : number,
    ){
        this.line = line;
    }
}