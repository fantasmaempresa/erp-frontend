import 'reflect-metadata';

export const printLabel = (label: string) => (target: any, propertyName: string) => {
  Reflect.defineMetadata('printLabel', label, target, propertyName);
};

export const mapToLabel = (mapFunc: (value: any) => any) => (target: any, propertyName: string) => {
  Reflect.defineMetadata('mapTo', mapFunc, target, propertyName);
};
