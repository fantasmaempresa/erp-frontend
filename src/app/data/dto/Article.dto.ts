import { EntityDto } from "o2c_core";

export interface ArticleDto extends EntityDto {
    billable : number;
    bar_code : string;
    description : string;
    name : string;
    image : string;
    line_id : number;
    purchase_cost : number;
    sale_cost : number;
    type : number;
    brand : string;
    storable : number;
    purchase_measure_unit : string;
    sale_measure_unit : string;
}