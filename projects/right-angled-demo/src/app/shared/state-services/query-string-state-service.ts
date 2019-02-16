import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { cloneAsLiteral, FiltersService, RTStateService } from 'right-angled';

@Injectable()
export class QueryStringStateService implements RTStateService {
    public serializationKey = 'rtls';
    constructor(private location: Location, private router: Router) {}
    public persistState(filtersService: FiltersService): void {
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
        const routerState = this.router.routerState.snapshot.root.queryParams[this.serializationKey]
            ? JSON.parse(decodeURIComponent(this.router.routerState.snapshot.root.queryParams[this.serializationKey]))
            : {};

        Object.assign(restoredState, routerState);
        return restoredState;
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
