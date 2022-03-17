import 'reflect-metadata';

export const printLabel = (label: string) => (target: any, propertyName: string) => {
  Reflect.defineMetadata('printLabel', label, target, propertyName);
};
