import { Component } from '@angular/core';
import { ActivationEnd, Router, RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  title = '';

  constructor(
    private router: Router,
    public titleService: Title,
    private breadcrumbService: BreadcrumbService,
  ) {
    this.getDataRoute().subscribe(({ breadcrumb }) => {
      if (breadcrumb instanceof Object) {
        this.title = '';
        return;
      }
      this.title = breadcrumb;
    });
  }

  getDataRoute() {
    return this.router.events.pipe(
      // @ts-ignore
      filter((event: RouterEvent) => event instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data),
    );
  }
}
