import { MessageHelper } from './MessageHelper';

export function messageDecision(title: string, body: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function ({ ...args }) {
      MessageHelper.decisionMessage(title, body, () => {
        return originalMethod.apply(this, args);
      });
    };
    return descriptor;
  };
}
