
import * as _ from 'lodash';
import { DataService } from './dataService';

export abstract class CachedService extends DataService {
    cache: { [key: string]: any } = {};

    wrapWithCache<T extends Function>(fn: T, key: string, expirationPolicy: () => Date | string, withArgs?: boolean): T {
        return <T>_.wrap(fn, function (initialFn, ...args: any[]) {
            var cacheKey = !!withArgs ? key + '__' + JSON.stringify(args) : key;

            var promise = this.getCacheValue(cacheKey);
            if (promise === null) {
                promise = initialFn.apply(this, args);
                this.setCacheValue(cacheKey, promise, expirationPolicy());
            }
            return promise;
        });
    }

    setCacheValue(key: string, value: any, expiresAt: Date | string): void {
        let cleanDate = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;

        this.cache[key] = { value: value, expiresAt: expiresAt };
    }

    getCacheValue(key: string): any {
        let val = this.cache[key];
        if (typeof val === 'undefined' || val === null) {
            return null;
        }

        var now = new Date();
        if ((val.expiresAt.valueOf() - now.valueOf()) < 0) {
            delete this.cache[key];
            return null;
        }

        return val.value;
    }

    removeCacheEntry(key: string): void {
        _.chain(this.cache)
            .keys()
            .filter((prop) => {
                return prop === key || prop.indexOf(key + '__') === 0;
            })
            .each((prop) => {
                delete this.cache[prop];
            });
    }

    dispose(): void {
        super.dispose();
        this.cache = null;
    }
}
