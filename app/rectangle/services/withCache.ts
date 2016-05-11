
import { CachedService } from './cachedService';

export default function WithCache(minutes: number) {
    return (target: CachedService, propertyName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>) => {
        let method = descriptor.value;
        descriptor.value = target.wrapWithCache(method, propertyName, () => new Date(new Date().getTime() + minutes * 60000), true);
    };
}