import { Location } from '@angular/common';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersService, cloneAsLiteral } from 'e2e4';

import { RtPersistenceService } from './persistence-service';

@Injectable()
export class RtQueryStringStateService implements RtPersistenceService {
    // tslint:disable-next-line: typedef
    public static settings = {
        serializationKeyName: 'ls'
    };
    public serializationKey: string = RtQueryStringStateService.settings.serializationKeyName;
    constructor(private location: Location, @Optional() @SkipSelf() private activatedRoute: ActivatedRoute, @Optional() @SkipSelf() private router: Router) {
    }
    public persistState(filtersService: FiltersService): void {
        setTimeout(() => {
            let newState = {};
            Object.assign(newState, filtersService.getRequestState());
            let params = cloneAsLiteral(this.router.routerState.root.snapshot.queryParams || {});

            params[this.serializationKey] = JSON.stringify(newState);
            let path = this.location.path(true);
            path = path.indexOf('?') === -1 ? path : path.substring(0, path.indexOf('?'));
            this.location.replaceState(path, this.serializeQueryParams(params));
        }, 0);
    }
    public getPersistedState(): Object {
        const restoredState = {};
        let routerState = this.router.routerState.snapshot.root.queryParams[this.serializationKey] ? JSON.parse(decodeURIComponent(this.router.routerState.snapshot.root.queryParams[this.serializationKey])) : {};

        Object.assign(restoredState, routerState);
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
}
