import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  /*** Local Storage Key draft forms   */
  private formDataKey = 'formData';
  private dataSubject = new BehaviorSubject<any>(null); 
  data$ = this.dataSubject.asObservable();


  /** Dynamicys Componentes forms projects  */
  //Send Form from child to father
  private formSubject = new BehaviorSubject<UntypedFormGroup>(new UntypedFormGroup({}));
  form$ = this.formSubject.asObservable();
  // Execution Command from father to child
  private executionSubject = new BehaviorSubject<any>(null);
  executionCommand$ = this.executionSubject.asObservable();


  constructor() { }

  /*** Local Storage Key draft forms */
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

  /** Dynamicys Componentes forms projects  */
  updateLastForm(form: UntypedFormGroup) {
    this.formSubject.next(form);
  }

  executionCommand(command: any) {
    this.executionSubject.next(command);
  }

}
