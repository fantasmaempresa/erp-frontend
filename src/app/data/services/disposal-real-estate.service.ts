import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { DisposalRealEstateDto } from '../dto/DisposalRealEstate.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DisposalRealEstateService extends CrudService<
  DisposalRealEstateDto,
  Pagination<DisposalRealEstateDto>
> {
  constructor() {
    super('disposalRealEstate');
  }

  generateReport(disposal_real_estate_id: number) {
    
    return this._http.get(
      `${environment.base_url}/disposalRealEstate/report/${disposal_real_estate_id}`,
      {
        responseType: 'blob',
        observe: 'response',
      },
    );
  }

}
