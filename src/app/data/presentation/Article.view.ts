import { ViewsModule, viewCrud, viewLabel } from "o2c_core";
import { ArticleService } from "../services/article.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: ArticleService,
    registerName: 'Artículo',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ArticleView {
    @viewLabel('Identificador')
    id : number;
    @viewLabel('Facturable')
    billable : string;
    @viewLabel('Código de Barras')
    bar_code : string;
    @viewLabel('Descripción')
    description : string;
    @viewLabel('Nombre')
    name : string;
    @viewLabel('Imagen')
    image : string;
    @viewLabel('Id de Linea')
    line_id : number;
    @viewLabel('Costo de la Compra')
    purchase_cost : number;
    @viewLabel('Costo de Venta')
    sale_cost : number;
    @viewLabel('Tipo')
    type : string;
    @viewLabel('Marca')
    brand : string;
    @viewLabel('Almacenable')
    storable : string;
    @viewLabel('Unidad de Medida de Compra')
    purchase_measure_unit : string;
    @viewLabel('Unidad de Medida de Venta')
    sale_measure_unit : string;

    constructor(
        id: number,
        billable : string,
        bar_code : string,
        description : string,
        name : string,
        image : string,
        line_id : number,
        purchase_cost : number,
        sale_cost : number,
        type : string,
        brand : string,
        storable : string,
        purchase_measure_unit : string,
        sale_measure_unit : string,
    ){
        this.id = id;
        this.billable = billable;
        this.bar_code = bar_code;
        this.description = description;
        this.name = name;
        this.image = image;
        this.line_id = line_id;
        this.purchase_cost = purchase_cost;
        this.sale_cost = sale_cost;
        this.type = type;
        this.brand = brand;
        this.storable = storable;
        this.purchase_measure_unit = purchase_measure_unit;
        this.sale_measure_unit = sale_measure_unit;
    }
}