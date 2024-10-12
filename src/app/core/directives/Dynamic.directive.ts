import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamic]',
  standalone: true,
})
export class DynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
