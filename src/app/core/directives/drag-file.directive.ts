import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragFile]',
})
export class DragFileDirective {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onFileDropped = new EventEmitter<any>();

  // @HostBinding('style.background-color') private background = '#f5fcff';
  // @HostBinding('style.opacity') private opacity = '1';

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.background = '#9ecbec';
    // this.opacity = '0.8';
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.background = '#f5fcff';
    // this.opacity = '1';
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.background = '#f5fcff';
    // this.opacity = '1';
    const { files } = evt.dataTransfer ?? { files: [] };
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}
