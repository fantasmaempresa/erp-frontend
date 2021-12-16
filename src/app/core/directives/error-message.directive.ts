import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements AfterViewInit {
  matError!: any;

  constructor(private el: ElementRef, private control: NgControl, private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    this.matError = this.el.nativeElement.nextElementSibling;
  }

  @HostListener('blur')
  setErrors() {
    console.log(this.matError);
    // this.renderer2.setProperty(this.matError, 'innerText', `Error`);
  }
}
