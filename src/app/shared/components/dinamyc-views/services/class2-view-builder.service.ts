import { Inject, Injectable } from '@angular/core';
import { CLAZZ } from '../dynamic-views.module';
import 'reflect-metadata';

@Injectable({
  providedIn: 'root',
})
export class Class2ViewBuilderService {
  private readonly objClass: any;

  constructor(@Inject(CLAZZ) clazz: any) {
    this.objClass = new clazz();
  }

  getAttrs(): string[] {
    const propertyNames = Object.getOwnPropertyNames(this.objClass);
    return propertyNames.filter((key) =>
      Reflect.getMetadataKeys(this.objClass, key).includes('printLabel'),
    );
  }

  getLabels(): string[] {
    const printableKeys = this.getAttrs();
    return printableKeys.map((key) => Reflect.getMetadata('printLabel', this.objClass, key));
  }
}
