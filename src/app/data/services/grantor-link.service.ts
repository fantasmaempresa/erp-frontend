import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from 'o2c_core';
import { GrantorDto } from '../dto/Grantor.dto';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrantorLinkService extends CrudService<
GrantorDto,
Pagination<GrantorDto>
> {
constructor(private contextService: ViewContextService) {
  super('grantorLink');
}

fetchAll(): Observable<Pagination<GrantorDto>> {
  return this.contextService.injector$.pipe(
    map((injector) => injector.get(ActivatedRoute)),
    map((route: ActivatedRoute) => route.snapshot.parent?.params.idGrantor ?? 0),
    map(
      (grantorId) =>
        new HttpParams({
          fromObject: { grantor_id: `${grantorId}` },
        }),
    ),
    switchMap((p) => super.fetchAll(p)),
  );
}
}
