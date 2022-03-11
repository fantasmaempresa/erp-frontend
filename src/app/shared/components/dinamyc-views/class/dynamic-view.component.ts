import { MemoizedSelector, Store } from '@ngrx/store';
import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import {
  ACTION_KEY,
  FIELDS,
  LABELS,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../dynamic-views.module';

@Component({
  template: '',
})
export abstract class DynamicViewComponent<T extends EntityModel> {
  data$!: Observable<Pagination<T> | null>;

  public constructor(
    protected store: Store,
    @Inject(SELECTOR)
    protected selector: MemoizedSelector<any, any>,
    @Inject(LOAD_ACTION)
    protected loadAction: any,
    @Inject(LOAD_NEXT_ACTION)
    protected loadNextPageAction: (props: { size: number; page: number }) => any,
    @Inject(FIELDS)
    public displayedColumns: string[],
    @Inject(LABELS)
    public labels: string[],
    @Optional()
    @Inject(ACTION_KEY)
    protected actionKey: string,
    protected route: ActivatedRoute,
  ) {
    this.data$ = this.store.select(selector);
    const id = Number(this.route.snapshot.parent?.params.id);

    if (id && this.actionKey) {
      this.store.dispatch(loadAction({ [actionKey]: id }));
    } else {
      this.store.dispatch(loadAction);
    }
  }
}
