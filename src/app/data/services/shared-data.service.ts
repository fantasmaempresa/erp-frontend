import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSubject = new BehaviorSubject<any>(null); 

  data$ = this.dataSubject.asObservable();

  constructor() { }

  updateData(data: any) {
    this.dataSubject.next(data);
  }
}
