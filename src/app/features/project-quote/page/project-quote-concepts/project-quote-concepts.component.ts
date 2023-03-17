import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ConceptServiceOld } from '../../../../data/services';
import { ConceptDto } from '../../../../data/dto';

@Component({
  selector: 'app-project-quote-concepts',
  templateUrl: './project-quote-concepts.component.html',
  styleUrls: ['./project-quote-concepts.component.scss'],
})
export class ProjectQuoteConceptsComponent {
  concepts = new UntypedFormArray([]);

  concepts$: Observable<ConceptDto[]> = this.conceptService
    .fetchAll()
    .pipe(map((concepts) => concepts.data));

  constructor(private conceptService: ConceptServiceOld) {}

  addNewConcept() {
    this.concepts.push(new UntypedFormControl({}));
  }
}
