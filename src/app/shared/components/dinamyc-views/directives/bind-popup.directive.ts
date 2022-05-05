import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  StaticProvider,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupSelectorComponent } from '../popup-selector/popup-selector.component';
import { take } from 'rxjs';
import { BACKSPACE } from '@angular/cdk/keycodes';
import { CrudService } from '../../../../core/classes/Crud/CrudService';

@Directive({
  selector: '[appBindPopup]',
})
export class BindPopupDirective implements OnInit {
  @Input()
  providers!: StaticProvider[];

  @Input()
  service!: CrudService<any>;

  @HostBinding('style.cursor') cursor = 'pointer';

  @Input()
  propertyAccess = 'name';

  constructor(private el: ElementRef, private ngControl: NgControl, private dialog: MatDialog) {}

  @HostListener('click')
  onClick() {
    this.openDialog();
  }

  @HostListener('keydown', ['$event'])
  onDeleteKey(evt: KeyboardEvent) {
    evt.preventDefault();
    if (evt.keyCode === BACKSPACE) {
      this.ngControl.control?.setValue(null);
      this.el.nativeElement.value = '';
    }
  }

  @HostBinding()
  openDialog() {
    const dialog = this.dialog.open(PopupSelectorComponent, {
      data: { providers: this.providers },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          this.ngControl.control?.setValue(value.id);
          this.el.nativeElement.value = value[this.propertyAccess];
        }
        this.ngControl.control?.markAsTouched();
      });
  }

  ngOnInit() {
    if (!this.service) {
      throw new Error('Service to fetch not provided');
    }
    const id = this.ngControl.value;
    if (id) {
      this.service.fetch(id).subscribe((value) => {
        this.el.nativeElement.value = value[this.propertyAccess];
      });
    }
  }
}
