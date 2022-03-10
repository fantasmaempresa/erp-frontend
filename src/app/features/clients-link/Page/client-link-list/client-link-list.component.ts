import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-link-list',
  templateUrl: './client-link-list.component.html',
  styleUrls: ['./client-link-list.component.scss'],
})
export class ClientLinkListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async goToNewClientLink() {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  }
}
