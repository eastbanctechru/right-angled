import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, SkipSelf, Optional } from '@angular/core';

import { RtStateManagementService } from './rt-state-management-service';

@Injectable()
export class RtQueryStringStateService implements RtStateManagementService {
    private static stateObject: Map<any, any> = new Map<any, any>();
    public target: any;
    public serializationKey: string;

    constructor( @Optional() @SkipSelf() private activatedRoute: ActivatedRoute, @Optional() @SkipSelf() private router: Router) {
    }
    public flushRequestState(state: Object): void {
        RtQueryStringStateService.stateObject.set(this.target, RtQueryStringStateService.stateObject.get(this.target) || {});
        let vmState = RtQueryStringStateService.stateObject.get(this.target);
        setTimeout(() => {
            let newState = {};
            Object.assign(newState, state);
            vmState.lastRequestState = newState;
            let params = this.router.routerState.snapshot.queryParams || {};
            params[this.serializationKey] = JSON.stringify(vmState.lastRequestState);
            this.router.navigate(['/' + this.activatedRoute.snapshot.url[0].path], { queryParams: params });
        }, 0);
    }
    public persistLocalState(state: Object): void { return void (0); }
    public mergeStates(): Object {
        const restoredState = {};
        const requestState = this.getRequestState();
        const persistedState = this.getPersistedState();
        let routerState = this.router.routerState.snapshot.queryParams[this.serializationKey] ? JSON.parse(decodeURIComponent(this.router.routerState.snapshot.queryParams[this.serializationKey])) : {};

        Object.assign(restoredState, persistedState || {}, requestState ? (requestState.lastRequestState || {}) : {}, routerState);
        return restoredState;
    }
    private getRequestState(): any {
        return RtQueryStringStateService.stateObject.get(this.target);
    }
    private getPersistedState(): any {
        return {};
    }
}
