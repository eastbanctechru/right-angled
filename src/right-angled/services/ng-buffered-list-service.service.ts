import { Injectable } from '@angular/core';

import { NgBufferedPager } from './injectables';
import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgBufferedListService extends NgListServiceBase {
    constructor(public pager: NgBufferedPager, stateManager: NgQueryStringStateService) {
        super(pager, stateManager);
    }
    public wrap(target: any): NgBufferedListService {
        super.wrap(target);
        return this;
    }
}
