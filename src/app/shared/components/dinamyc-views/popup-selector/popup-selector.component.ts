import {
  Component,
  ComponentRef,
  Inject,
  Injector,
  OnInit,
  StaticProvider,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HostDirective } from '../../../../core/directives/ad-host.directive';
import { TableViewComponent } from '../table-view/table-view.component';

interface PopUpData {
  providers: StaticProvider[];
}

@Component({
  selector: 'app-popup-selector',
  templateUrl: './popup-selector.component.html',
  styleUrls: ['./popup-selector.component.scss'],
})
export class PopupSelectorComponent implements OnInit {
  @ViewChild(HostDirective, { static: true }) container!: HostDirective;

  componentRef!: ComponentRef<TableViewComponent<any>>;

  constructor(
    private dialogRef: MatDialogRef<PopupSelectorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PopUpData,
    private inj: Injector,
  ) {}

  ngOnInit(): void {
    const injector = Injector.create([...this.data.providers], this.inj);

    this.componentRef = this.container.viewContainerRef.createComponent(TableViewComponent, {
      injector,
    });
  }

  closeDialog() {
    this.dialogRef.close(this.componentRef.instance.getSelectedElement());
  }
}
