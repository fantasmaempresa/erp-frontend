import { Component } from "@angular/core";
import { UntypedFormArray, UntypedFormControl } from "@angular/forms";
import { map, Observable } from "rxjs";
import { ConceptService } from "../../../../data/services/concept.service";
import { ConceptDto } from "../../../../data/dto/Concept.dto";

@Component({
  selector: "app-project-quote-concepts",
  templateUrl: "./project-quote-concepts.component.html",
  styleUrls: ["./project-quote-concepts.component.scss"]
})
export class ProjectQuoteConceptsComponent {
  concepts = new UntypedFormArray([]);

  concepts$: Observable<ConceptDto[]>;

  constructor(private conceptService: ConceptService) {
    this.concepts$ = this.conceptService.fetchAll().pipe(map((concepts) => concepts.data));
  }

  addNewConcept() {
    this.concepts.push(new UntypedFormControl({}));
  }
}
