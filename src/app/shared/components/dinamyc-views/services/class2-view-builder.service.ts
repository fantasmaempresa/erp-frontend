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

  getMapsFunctions() {
    const printableKeys = this.getAttrs();
    const mapToArrays = printableKeys.filter((key) =>
      Reflect.getMetadataKeys(this.objClass, key).includes('mapTo'),
    );
    const objectMapper = mapToArrays.map((key) => ({
      [key]: Reflect.getMetadata('mapTo', this.objClass, key),
    }));
    return objectMapper.reduce((acc, value) => ({ ...acc, ...value }), {});
  }
}
