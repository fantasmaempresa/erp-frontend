import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  backToListUsers() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
