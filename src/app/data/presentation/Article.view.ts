import { ViewsModule, viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { ArticleService } from "../services/article.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";

@viewCrud({
    classProvider: ArticleService,
    registerName: 'Artículo',
    route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ArticleView {
    @viewMapTo((value: any) => {
        const billable = {
            0: 'No',
            1: 'Si',
        };
        return billable[value as keyof typeof billable];
    }) 
    @viewLabel('Facturable')
    billable : number;
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
    @viewMapTo((value: any) => {
        const type = {
            1: 'Activo',
            2: 'Consumible',
        };
        return type[value as keyof typeof type];
    })
    @viewLabel('Tipo')
    type : number;
    @viewLabel('Marca')
    brand : string;
    @viewMapTo((value: any) => {
        const storable = {
            0: 'No',
            1: 'Si',
        };
        return storable[value as keyof typeof storable];
    })
    @viewLabel('Almacenable')
    storable : string;
    @viewLabel('Unidad de Medida de Compra')
    purchase_measure_unit : string;
    @viewLabel('Unidad de Medida de Venta')
    sale_measure_unit : string;

    constructor(
        billable : number,
        bar_code : string,
        description : string,
        name : string,
        image : string,
        line_id : number,
        purchase_cost : number,
        sale_cost : number,
        type : number,
        brand : string,
        storable : string,
        purchase_measure_unit : string,
        sale_measure_unit : string,
    ){
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