import { EntityDto } from "o2c_core";

export interface ArticleDto extends EntityDto {
    id : number;
    billable : string;
    bar_code : string;
    description : string;
    name : string;
    image : string;
    line_id : number;
    purchase_cost : number;
    sale_cost : number;
    type : string;
    brand : string;
    storable : string;
    purchase_measure_unit : string;
    sale_measure_unit : string;
}