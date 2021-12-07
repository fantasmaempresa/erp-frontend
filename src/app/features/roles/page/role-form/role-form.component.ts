import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  async backToListRoles() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
