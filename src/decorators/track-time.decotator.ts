import { performance } from 'perf_hooks';
import { Logger } from '../components';

export const trackTime = (target: unknown, propertyName: string, descriptor: PropertyDescriptor): void => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: unknown[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    Logger.info(`Time to execute method ${originalMethod.name}: ${end - start} ms`);
    return result;
  };
};
