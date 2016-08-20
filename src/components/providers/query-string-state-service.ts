import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, SkipSelf, Optional } from '@angular/core';

import { cloneAsLiteral } from 'e2e4';

@Injectable()
export class RtQueryStringStateService {
    // tslint:disable-next-line: typedef
    public static settings = {
        persistanceEnabled: true,
        requestFlushingEnabled: true
    };

    private static stateObject: Map<any, any> = new Map<any, any>();
    public serializationKey: string;
    public requestFlushingEnabled: boolean = RtQueryStringStateService.settings.requestFlushingEnabled;
    public persistanceEnabled: boolean = RtQueryStringStateService.settings.persistanceEnabled;

    private internalStateKey: string;

    constructor(private location: Location, @Optional() @SkipSelf() private activatedRoute: ActivatedRoute, @Optional() @SkipSelf() private router: Router) {
        this.internalStateKey = this.activatedRoute.snapshot.url.length > 0 ? this.activatedRoute.snapshot.url.map(segment => segment.path).join(':') : 'default-route';
    }
    public flushRequestState(state: Object): void {
        if (!this.requestFlushingEnabled) {
            return;
        }
        let vmState = this.getRequestState();
        RtQueryStringStateService.stateObject.set(this.internalStateKey, vmState);

        setTimeout(() => {
            let newState = {};
            Object.assign(newState, state);
            vmState.lastRequestState = newState;
            let params = cloneAsLiteral(this.router.routerState.root.snapshot.queryParams || {});

            params[this.serializationKey] = JSON.stringify(vmState.lastRequestState);
            let path = this.location.path(true);
            path = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));
            this.location.replaceState(path, this.serializeQueryParams(params));
        }, 0);
    }
    public persistLocalState(state: Object): void {
        if (!this.persistanceEnabled) {
            return;
        }
        return void (0);
    }
    public mergeStates(): Object {
        const restoredState = {};
        const requestState = this.getRequestState();
        const persistedState = this.getPersistedState();
        let routerState = this.router.routerState.snapshot.root.queryParams[this.serializationKey] ? JSON.parse(decodeURIComponent(this.router.routerState.snapshot.root.queryParams[this.serializationKey])) : {};

        Object.assign(restoredState, persistedState || {}, requestState ? (requestState.lastRequestState || {}) : {}, routerState);
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
    private getRequestState(): any {
        return RtQueryStringStateService.stateObject.get(this.internalStateKey) || {};
    }
    private getPersistedState(): any {
        return {};
    }
}
