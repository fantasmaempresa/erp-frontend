import { Injectable, Injector } from '@angular/core';
import { CLAZZ } from '../dynamic-views.module';
import 'reflect-metadata';

@Injectable({
  providedIn: 'root',
})
export class Class2ViewBuilderService {
  public readonly objClass: any;

  constructor(private inj: Injector) {
    const clazz = this.inj.get(CLAZZ, null);
    if (clazz) {
      this.objClass = new clazz();
    }
  }

  getAttrs(): string[] {
    if (!this.objClass) return [];
    const propertyNames = Object.getOwnPropertyNames(this.objClass);
    return propertyNames
      .filter((key) => Reflect.getMetadataKeys(this.objClass, key).includes('printLabel'))
      .map((key) => {
        return { key, metadata: Reflect.getMetadata('printLabel', this.objClass, key) };
      })
      .sort((a, b) => b.metadata.order - a.metadata.order)
      .map(({ key }) => key);
  }

  getLabels(): string[] {
    const printableKeys = this.getAttrs();
    return printableKeys
      .map((key) => Reflect.getMetadata('printLabel', this.objClass, key))
      .map(({ label }) => label);
  }

  getMapsFunctions() {
    const printableKeys = this.getAttrs();
    return this._getKeysDecoratorValues(printableKeys, 'mapTo');
  }

  getHtmlMaps() {
    const printableKeys = this.getAttrs();
    return this._getKeysDecoratorValues(printableKeys, 'mapHTML');
  }

  private _getKeysDecoratorValues(printableKeys: string[], decoratorName: string) {
    const mapToArrays = printableKeys.filter((key) =>
      Reflect.getMetadataKeys(this.objClass, key).includes(decoratorName),
    );
    const objectMapper = mapToArrays.map((key) => ({
      [key]: Reflect.getMetadata(decoratorName, this.objClass, key),
    }));
    return objectMapper.reduce((acc, value) => ({ ...acc, ...value }), {});
  }
}
