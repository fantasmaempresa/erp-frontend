import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  backToListRoles() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
