import { StateManager } from './stateManager';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, SkipSelf, Optional } from '@angular/core';

@Injectable()
export class QueryStringStateManager implements StateManager {
    private static stateObject: Map<any, any> = new Map<any, any>();
    private activatedRoute: ActivatedRoute;
    private router: Router;
    public target: any;

    constructor( @Optional() @SkipSelf() activatedRoute: ActivatedRoute, @Optional() @SkipSelf() router: Router) {
        this.activatedRoute = activatedRoute;
        this.router = router;

    }
    public flushRequestState(state: Object): void {
        QueryStringStateManager.stateObject.set(this.target, QueryStringStateManager.stateObject.get(this.target) || {});
        let vmState = QueryStringStateManager.stateObject.get(this.target);
        setTimeout(() => {
            let newState = {};
            Object.assign(newState, state);
            vmState.lastRequestState = newState;
            let params = this.router.routerState.snapshot.queryParams || {};

            Object.assign(params, vmState.lastRequestState);
            this.router.navigate(['/' + this.activatedRoute.snapshot.url[0].path], { queryParams: params });
        }, 0);
    }
    public persistLocalState(state: Object): void { return void (0); }
    public mergeStates(): Object {
        const restoredState = {};
        const requestState = this.getRequestState();
        const persistedState = this.getPersistedState();
        Object.assign(restoredState, persistedState || {}, requestState ? (requestState.lastRequestState || {}) : {}, this.router.routerState.snapshot.queryParams || {});
        return restoredState;
    }
    private getRequestState(): any {
        return QueryStringStateManager.stateObject.get(this.target);
    }
    private getPersistedState(): any {
        return {};
    }
}
