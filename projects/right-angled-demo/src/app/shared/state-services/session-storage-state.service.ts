import { Injectable, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RTFiltersService, RTStateService } from 'right-angled';

@Injectable()
export class SessionStorageStateService implements RTStateService {
    private stateKey: string;

    constructor(
        @Optional()
        @SkipSelf()
        private activatedRoute: ActivatedRoute
    ) {
        this.stateKey = this.activatedRoute.snapshot.url.length > 0 ? this.activatedRoute.snapshot.url.map(segment => segment.path).join(':') : 'default-route';
    }

    public persistState(filtersService: RTFiltersService): void {
        try {
            const data = { data: filtersService.getRequestState() };
            window.sessionStorage.setItem(this.stateKey, JSON.stringify(data));
        } catch (e) {
            // supress QUOTA_EXCEEDED_ERR because we can't do anything with it
        }
    }

    public getState(): any {
        const res = window.sessionStorage.getItem(this.stateKey);
        if (res === null) {
            return undefined;
        } else {
            return JSON.parse(res).data;
        }
    }
}
