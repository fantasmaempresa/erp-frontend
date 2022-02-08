import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { bindCallback } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { incomingNotification } from '../../state/notifications/notification.actions';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  constructor(
    private socketService: SocketService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    let getQuotesAsObservable$ = bindCallback(this.socketService.subscribeToChannel);
    getQuotesAsObservable$('quotes', 'QuoteEvent').subscribe((notification: any) => {
      this.store.dispatch(incomingNotification({ notification }));
    });
  }
}
