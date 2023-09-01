import { Injectable } from '@angular/core';
import { CrudService, Pagination, ViewContextService } from "o2c_core";
import { ShapeDto } from '../dto/Shape.dto';
import { HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShapeLinkService extends CrudService<
  ShapeDto,
  Pagination<ShapeDto>
> {
  constructor(private contextService: ViewContextService) {
    super('shape');
  }

  fetchAll(): Observable<Pagination<ShapeDto>> {
    return this.contextService.injector$.pipe(
      map((injector) => injector.get(ActivatedRoute)),
      map((route: ActivatedRoute) => ({
        procedure_id: route.snapshot.parent?.params.id ?? 0,
      })),
      map(
        ({ procedure_id }) =>
          new HttpParams({
            fromObject: { procedure_id: `${procedure_id}` },
          }),
      ),
      switchMap((p) => super.fetchAll(p)),
    );
  }
}
