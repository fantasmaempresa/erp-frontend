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
    const attrs = [];
    const propertyNames = Object.getOwnPropertyNames(this.objClass);
    for (const propertyName of propertyNames) {
      const decorators = Reflect.getMetadataKeys(this.objClass, propertyName);
      if (decorators.includes('printLabel')) {
        attrs.push(propertyName);
      }
    }
    return attrs;
  }

  getLabels(): string[] {
    const propertyNames = Object.getOwnPropertyNames(this.objClass);

    const printableKeys = propertyNames.filter((key) =>
      Reflect.getMetadataKeys(this.objClass, key).includes('printLabel'),
    );

    return printableKeys.map((key) => Reflect.getMetadata('printLabel', this.objClass, key));
  }
}
