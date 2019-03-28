import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { cloneAsLiteral, RTFiltersService, RTStateService } from 'right-angled';

@Injectable()
export class QueryStringStateService implements RTStateService {
    public serializationKey = 'rtls';
    constructor(private location: Location, private router: Router) {}
    public persistState(filtersService: RTFiltersService): void {
        const newState = {};
        Object.assign(newState, filtersService.getRequestState());
        const params = cloneAsLiteral(this.router.routerState.root.snapshot.queryParams || {});
        params[this.serializationKey] = JSON.stringify(newState);
        let path = this.location.path(true);
        path = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));
        this.location.replaceState(path, this.serializeQueryParams(params));
    }
    public getState(): object {
        const restoredState = {};
        const queryState = this.router.routerState.snapshot.root.queryParams[this.serializationKey] || this.tryGetQueryStringFromFragment();
        const routerState = queryState ? JSON.parse(decodeURIComponent(queryState)) : {};

        Object.assign(restoredState, routerState);
        return restoredState;
    }
    /*
     * This function is required to parse query string with hash. Angular router can't handle such situations
     */
    private tryGetQueryStringFromFragment(): string | null {
        const fragment = this.router.routerState.snapshot.root.fragment;
        if (!fragment || fragment.indexOf('?') === -1) {
            return null;
        }
        let result = null;
        const qs = fragment.substring(fragment.indexOf('?') + 1);
        if (qs) {
            qs.split('&').find(pair => {
                const value = pair.split('=');
                if (value.length === 2 && value[0] === this.serializationKey) {
                    result = value[1];
                    return true;
                }
                return false;
            });
        }
        return result;
    }
    private serializeQueryParams(params: { [key: string]: string }): string {
        const res: string[] = [];
        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                res.push(`${encodeURIComponent(prop)}=${encodeURIComponent(params[prop])}`);
            }
        }
        return res.join('&');
    }
}
