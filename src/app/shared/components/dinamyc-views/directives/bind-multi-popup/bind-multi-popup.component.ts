import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnInit,
  StaticProvider,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CrudService } from '../../../../../core/classes/Crud/CrudService';
import { MatDialog } from '@angular/material/dialog';
import { NgControl } from '@angular/forms';
import { BACKSPACE } from '@angular/cdk/keycodes';
import { forkJoin, take } from 'rxjs';
import { PopupMultiSelectorComponent } from '../../popup-multi-selector/popup-multi-selector.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-bind-multi-popup]',
  templateUrl: './bind-multi-popup.component.html',
  styleUrls: ['./bind-multi-popup.component.scss'],
})
export class BindMultiPopupComponent implements OnInit {
  @ViewChild('templateRef', { static: true }) templateRef!: TemplateRef<any>;

  selected: any[] = [];

  @Input()
  providers!: StaticProvider[];

  @Input()
  title = '';

  @Input()
  service!: CrudService<any>;

  @HostBinding('style.cursor') cursor = 'pointer';

  @Input()
  propertyAccess = 'name';

  constructor(
    private view: ViewContainerRef,
    private dialog: MatDialog,
    private ngControl: NgControl,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.view.createEmbeddedView(this.templateRef);

    if (!this.service) {
      throw new Error('Service to fetch not provided');
    }
    const idArray = this.ngControl.value;
    if (idArray) {
      const arrayRequest$ = idArray.map((item: any) => this.service.fetch(item.id));
      forkJoin(arrayRequest$).subscribe((value: any) => {
        this.selected = value;
      });
    }
    this.el.nativeElement.value = ' ';
  }

  @HostListener('click')
  onClick() {
    this.openDialog();
  }

  @HostListener('keydown', ['$event'])
  onDeleteKey(evt: KeyboardEvent) {
    evt.preventDefault();
    if (evt.keyCode === BACKSPACE) {
      this.ngControl.control?.setValue(null);
      this.selected = [];
    }
  }

  @HostBinding()
  openDialog() {
    const inj = Injector.create(this.providers);
    const dialog = this.dialog.open(PopupMultiSelectorComponent, {
      data: { inj, title: this.title, property: this.propertyAccess },
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          this.ngControl.control?.setValue(
            value.map((item: any) => ({
              id: item.id,
            })),
          );
          this.el.nativeElement.value = ' ';
          this.selected = value;
        }
        this.ngControl.control?.markAsTouched();
      });
  }
}
