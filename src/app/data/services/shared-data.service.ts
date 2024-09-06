import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private formDataKey = 'formData';
  
  private dataSubject = new BehaviorSubject<any>(null); 

  data$ = this.dataSubject.asObservable();

  constructor() { }

  updateData(data: any) {
    this.dataSubject.next(data);
  }

  saveFormData(formId: string, formData: any) {
    localStorage.setItem(`${this.formDataKey}-${formId}`, JSON.stringify(formData));
  }

  getFormData(formId: string) {
    const data = localStorage.getItem(`${this.formDataKey}-${formId}`);
    return data ? JSON.parse(data) : null;
  }

  deleteFormData(formId: string) {
    localStorage.removeItem(`${this.formDataKey}-${formId}`);
  }
}
