import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, SkipSelf, Optional } from '@angular/core';

import { RtStateManagementService } from './state-management-service';
import { cloneAsLiteral } from 'e2e4';

@Injectable()
export class RtQueryStringStateService implements RtStateManagementService {
    private static stateObject: Map<any, any> = new Map<any, any>();
    public serializationKey: string;
    private internalStateKey: string;

    constructor(private location: Location, @Optional() @SkipSelf() private activatedRoute: ActivatedRoute, @Optional() @SkipSelf() private router: Router) {
        this.internalStateKey = this.activatedRoute.snapshot.url.length > 0 ? this.activatedRoute.snapshot.url.map(segment => segment.path).join(':') : 'default-route';
    }
    public flushRequestState(state: Object): void {

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
    public persistLocalState(state: Object): void { return void (0); }
    public mergeStates(): Object {
        const restoredState = {};
        const requestState = this.getRequestState();
        const persistedState = this.getPersistedState();
        let routerState = this.activatedRoute.snapshot.params[this.serializationKey] ? JSON.parse(decodeURIComponent(this.activatedRoute.snapshot.params[this.serializationKey])) : {};

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
