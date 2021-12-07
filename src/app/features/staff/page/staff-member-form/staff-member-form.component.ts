import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff-member-form',
  templateUrl: './staff-member-form.component.html',
  styleUrls: ['./staff-member-form.component.scss'],
})
export class StaffMemberFormComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
