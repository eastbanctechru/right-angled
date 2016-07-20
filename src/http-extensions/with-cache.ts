import { CachedService } from './cached-service';

// TODO krozhkov: declare interface for return value?
export function WithCache(minutes: number): (target: CachedService, propertyName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>) => void {
    return (target: CachedService, propertyName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>): void => {
        let method = descriptor.value;
        descriptor.value = target.wrapWithCache(method, propertyName, () => new Date(new Date().getTime() + minutes * 60000), true);
    };
}
