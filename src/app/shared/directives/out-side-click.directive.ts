import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOutSideClick]',
})
export class OutSideClickDirective {
  @Input()
  callback!: Function;

  @HostListener('document:click', ['$event']) clickOut() {
    this.callback();
  }
}
