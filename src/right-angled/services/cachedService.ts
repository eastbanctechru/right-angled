import { DataService } from './dataService';

export abstract class CachedService extends DataService {
    private cache: { [key: string]: any } = {};

    public wrapWithCache<T extends Function>(fn: T, key: string, expirationPolicy: () => Date | string, withArgs?: boolean): T {
        return <any>(function(...args: any[]): Promise<any> {
            let cacheKey = !!withArgs ? key + '__' + JSON.stringify(args) : key;

            let promise = this.getCacheValue(cacheKey);
            if (promise === null) {
                promise = fn.apply(this, args);
                this.setCacheValue(cacheKey, promise, expirationPolicy());
            }
            return promise;
        });
    }

    public setCacheValue(key: string, value: any, expiresAt: Date | string): void {
        this.cache[key] = { expiresAt: expiresAt, value: value };
    }

    public getCacheValue(key: string): any {
        let val = this.cache[key];
        if (typeof val === 'undefined' || val === null) {
            return null;
        }

        let now = new Date();
        if ((val.expiresAt.valueOf() - now.valueOf()) < 0) {
            delete this.cache[key];
            return null;
        }

        return val.value;
    }

    public removeCacheEntry(key: string): void {
        Object.keys(this.cache)
            .filter((prop) => {
                return prop === key || prop.indexOf(key + '__') === 0;
            })
            .forEach((prop) => {
                delete this.cache[prop];
            });
    }

    public dispose(): void {
        super.dispose();
        this.cache = null;
    }
}
