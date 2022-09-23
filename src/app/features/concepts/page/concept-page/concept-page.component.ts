import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-concept-page',
  templateUrl: './concept-page.component.html',
  styleUrls: ['./concept-page.component.scss'],
})
export class ConceptPageComponent {
  isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.queryParams.id) {
      this.isEdit = true;
    }
  }

  async backToListConcept() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
