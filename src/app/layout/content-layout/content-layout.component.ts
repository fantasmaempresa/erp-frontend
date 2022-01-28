import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    let getQuotesAsObservable$ = bindCallback(this.socketService.subscribeToChannel);
    getQuotesAsObservable$('quotes', 'QuoteEvent').subscribe((data) => console.log(data));
  }
}
