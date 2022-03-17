import { MemoizedSelector, Store } from '@ngrx/store';
import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { ACTION_KEY, LOAD_ACTION, LOAD_NEXT_ACTION, SELECTOR } from '../dynamic-views.module';
import { PageEvent } from '@angular/material/paginator';
import { Class2ViewBuilderService } from '../services/class2-view-builder.service';

@Component({
  template: '',
})
export abstract class DynamicViewComponent<T extends EntityModel> {
  data$!: Observable<Pagination<T> | null>;

  displayedColumns!: string[];

  labels!: string[];

  mapToFields: { [p: string]: any };

  mapToGetKey = (item: any, [index]: [number]) => {
    const key = this.displayedColumns[index];
    if (this.mapToFields && Object.keys(this.mapToFields).includes(key)) {
      // @ts-ignore
      return this.mapToFields[key](item[key]);
    } else {
      return item[key];
    }
  };

  pageSize = 10;

  pageSizeOptions = [5, 10, 25, 100];

  public constructor(
    protected store: Store,
    @Inject(SELECTOR)
    protected selector: MemoizedSelector<any, any>,
    @Inject(LOAD_ACTION)
    protected loadAction: any,
    @Inject(LOAD_NEXT_ACTION)
    protected loadNextPageAction: (props: { size: number; page: number }) => any,
    @Optional()
    @Inject(ACTION_KEY)
    protected actionKey: string,
    protected route: ActivatedRoute,
    class2View: Class2ViewBuilderService,
  ) {
    this.labels = class2View.getLabels();
    this.displayedColumns = class2View.getAttrs();
    this.mapToFields = class2View.getMapsFunctions();
    this.data$ = this.store.select(selector).pipe(shareReplay());
    const id = Number(this.route.snapshot.parent?.params.id);

    if (id && this.actionKey) {
      this.store.dispatch(loadAction({ [actionKey]: id }));
    } else {
      this.store.dispatch(loadAction);
    }
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.store.dispatch(this.loadNextPageAction({ size, page }));
  }
}
