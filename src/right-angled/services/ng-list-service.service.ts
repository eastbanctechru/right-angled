import { Injectable } from '@angular/core';

import { NgSimplePager } from './injectables';
import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgListService extends NgListServiceBase {
    constructor(public pager: NgSimplePager, stateManager: NgQueryStringStateService) {
        super(pager, stateManager);
    }
    public wrap(target: any): NgListService {
        super.wrap(target);
        return this;
    }
}
