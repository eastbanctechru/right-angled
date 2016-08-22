import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, SkipSelf, Optional } from '@angular/core';

import { cloneAsLiteral } from 'e2e4';

@Injectable()
export class RtQueryStringStateService {
    private static stateObject: Map<any, any> = new Map<any, any>();
    private internalStateKey: string;

    constructor(private location: Location, @Optional() @SkipSelf() private activatedRoute: ActivatedRoute, @Optional() @SkipSelf() private router: Router) {
        this.internalStateKey = this.activatedRoute.snapshot.url.length > 0 ? this.activatedRoute.snapshot.url.map(segment => segment.path).join(':') : 'default-route';
    }

    public flushRequestState(serializationKey: string, state: Object): void {
        let vmState = this.getInternalState();
        RtQueryStringStateService.stateObject.set(this.internalStateKey, vmState);

        setTimeout(() => {
            let newState = {};
            Object.assign(newState, state);
            vmState.lastRequestState = newState;
            let params = cloneAsLiteral(this.router.routerState.root.snapshot.queryParams || {});

            params[serializationKey] = JSON.stringify(vmState.lastRequestState);
            let path = this.location.path(true);
            path = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));
            this.location.replaceState(path, this.serializeQueryParams(params));
        }, 0);
    }
    public getRestoredStates(serializationKey: string): Object {
        const restoredState = {};
        const savedState = this.getInternalState();
        let routerState = this.router.routerState.snapshot.root.queryParams[serializationKey] ? JSON.parse(decodeURIComponent(this.router.routerState.snapshot.root.queryParams[serializationKey])) : {};

        Object.assign(restoredState, savedState ? (savedState.lastRequestState || {}) : {}, routerState);
        return restoredState;
    }
    private serializeQueryParams(params: { [key: string]: string }): string {
        const res: string[] = [];
        for (let prop in params) {
            if (params.hasOwnProperty(prop)) {
                res.push(`${encodeURIComponent(prop)}=${encodeURIComponent(params[prop])}`);
            }
        }
        return res.join('&');
    }
    private getInternalState(): any {
        return RtQueryStringStateService.stateObject.get(this.internalStateKey) || {};
    }
}
