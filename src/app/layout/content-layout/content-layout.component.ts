import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { bindCallback } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit(): void {
    let getQuotesAsObservable$ = bindCallback(this.socketService.subscribeToChannel);
    getQuotesAsObservable$('quotes', 'QuoteEvent').subscribe((data) => {
      const snackBarRef = this.snackBar.open('Se ha realizado una cotización', 'Abrir', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      snackBarRef.onAction().subscribe(() => {
        console.log('Estoy redirigiendo');
        this.router.navigate(['app/project-quote']);
      });
    });
  }
}
