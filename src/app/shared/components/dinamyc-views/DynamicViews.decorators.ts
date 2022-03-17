import 'reflect-metadata';

export const printLabel =
  (label: string, order: number = 0) =>
  (target: any, propertyName: string) => {
    Reflect.defineMetadata('printLabel', { label, order }, target, propertyName);
  };

export const mapToLabel = (mapFunc: (value: any) => any) => (target: any, propertyName: string) => {
  Reflect.defineMetadata('mapTo', mapFunc, target, propertyName);
};
