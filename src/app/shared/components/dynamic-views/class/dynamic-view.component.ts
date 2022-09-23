import { MemoizedSelector, Store } from '@ngrx/store';
import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import {
  ACTION_KEY,
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../dynamic-views.module';
import { PageEvent } from '@angular/material/paginator';
import { Class2ViewBuilderService } from '../services/class2-view-builder.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  template: '',
})
export abstract class DynamicViewComponent<T extends EntityDto> {
  data$!: Observable<Pagination<T> | null>;

  displayedColumns!: string[];

  labels!: string[];

  mapToFields: { [p: string]: any };

  mapToHTML: { [p: string]: any };

  mapToGetKey = (item: any, [index]: [number]) => {
    const key = this.displayedColumns[index];
    if (this.mapToFields && Object.keys(this.mapToFields).includes(key)) {
      return this.mapToFields[key](item[key]);
    } else {
      return item[key];
    }
  };

  mapToInnerHtml = (item: any, [index]: [number]) => {
    const key = this.displayedColumns[index];
    const innerHtml = this.mapToHTML[key](item[key]);
    return this.sanitizer.bypassSecurityTrustHtml(innerHtml);
  };

  pageSize = 10;

  pageSizeOptions = [5, 10, 25, 100];

  doesntHaveHtml = (key: string) => {
    return !this.mapToHTML[key];
  };

  protected loadAction: any;

  protected selector: MemoizedSelector<any, any>;

  protected loadNextPageAction: (props: { size: number; page: number }) => any;

  public constructor(
    protected store: Store,
    protected route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    inj: Injector,
  ) {
    const injector = Injector.create([
      { provide: Class2ViewBuilderService },
      {
        provide: CLAZZ,
        useValue: inj.get(CLAZZ),
      },
    ]);

    this.loadNextPageAction = inj.get(LOAD_NEXT_ACTION);
    const actionKey = inj.get(ACTION_KEY, null);
    this.selector = inj.get(SELECTOR);
    this.loadAction = inj.get(LOAD_ACTION);
    const class2View = injector.get(Class2ViewBuilderService);
    this.labels = class2View.getLabels();
    this.displayedColumns = class2View.getAttrs();
    this.mapToFields = class2View.getMapsFunctions();
    this.mapToHTML = class2View.getHtmlMaps();
    this.data$ = this.store.select(this.selector).pipe(shareReplay());
    const id = Number(this.route.snapshot.parent?.params.id);

    this.doOnConstructor();

    if (id && actionKey) {
      this.store.dispatch(this.loadAction({ [actionKey]: id }));
    } else {
      this.store.dispatch(this.loadAction);
    }
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(this.loadNextPageAction({ size, page }));
  }

  protected doOnConstructor() {}
}
