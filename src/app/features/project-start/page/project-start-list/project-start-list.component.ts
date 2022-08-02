import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../../../core/interfaces/Pagination.model';
import { selectMyProjects } from '../../../../state/my-project/my-project.selector';
import { loadMyProjects } from '../../../../state/my-project/my-project.actions';

@Component({
  selector: 'app-project-start-list',
  templateUrl: './project-start-list.component.html',
  styleUrls: ['./project-start-list.component.scss'],
})
export class ProjectStartListComponent implements OnInit {
  myProjects$!: Observable<Pagination<any> | null>;

  displayedInfo = [
    {
      label: 'Nombre',
      key: 'name',
    },
    {
      label: 'Descripción',
      key: 'description',
    },
    {
      label: 'Folio',
      key: 'folio',
    },
    {
      label: 'Fecha Estimada',
      key: 'estimate_end_date',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    this.myProjects$ = this.store.select(selectMyProjects);
  }

  ngOnInit(): void {
    this.store.dispatch(loadMyProjects());
  }
}
