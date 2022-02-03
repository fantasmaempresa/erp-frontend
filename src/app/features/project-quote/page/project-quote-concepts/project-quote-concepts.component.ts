import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ConceptService } from '../../../../data/services/concept.service';
import { Concept } from '../../../../data/models/Concept.model';

@Component({
  selector: 'app-project-quote-concepts',
  templateUrl: './project-quote-concepts.component.html',
  styleUrls: ['./project-quote-concepts.component.scss'],
})
export class ProjectQuoteConceptsComponent {
  concepts = new FormArray([]);

  concepts$: Observable<Concept[]>;

  constructor(private conceptService: ConceptService) {
    this.concepts$ = this.conceptService.fetchAll().pipe(map((concepts) => concepts.data));
  }

  addNewConcept() {
    this.concepts.push(new FormControl({}));
  }
}
