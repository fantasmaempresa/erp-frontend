import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss'],
})
export class AreaFormComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  backToListAreas() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
