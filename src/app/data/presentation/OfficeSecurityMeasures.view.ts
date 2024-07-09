import { viewCrud,viewLabel,viewMapTo } from "o2c_core";
import { OfficeSecurityMeasuresService } from "../services/office-security-measures.service";
import { DEFAULT_ROUTE_CONFIGURATION } from "src/app/core/constants/routes.constants";
import { StaffDto } from "../dto";
import { ArticleDto } from "../dto/Article.dto";

@viewCrud({
    classProvider:OfficeSecurityMeasuresService,
    registerName:'Medidas de seguridad de la oficina',
    route: DEFAULT_ROUTE_CONFIGURATION
})

export class OfficeSecurityMeasuresView {
    @viewLabel("Identificador")
    id: number;
    @viewLabel("Id de artículo")
    @viewMapTo((value:any) => value?.name)
    article_id?: ArticleDto;
    @viewLabel("Id de personal")
    @viewMapTo((value:any) => value?.name)
    staff_id?: StaffDto;
    @viewLabel("Fecha de adquisición")
    adquisition_date: Date;
    @viewLabel("Fecha de retorno")
    return_date: Date;
    @viewLabel("Comentarios de adquisición")
    adquisition_comments: string;
    @viewLabel("Comentarios de retorno")
    return_comments: string;
  
    constructor(
        id: number,
        adquisition_date: Date,
        return_date: Date,
        adquisition_comments: string,
        return_comments: string,
        article_id?: ArticleDto,
        staff_id?: StaffDto,
    ) {
      this.id = id;
      this.article_id = article_id;
      this.staff_id = staff_id;
      this.adquisition_date = adquisition_date;
      this.return_date = return_date;
      this.adquisition_comments = adquisition_comments;
      this.return_comments = return_comments;
    }
  }