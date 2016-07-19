import { Injectable } from '@angular/core';
import { SimplePager } from 'e2e4';

import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';
@Injectable()
export class NgListService extends NgListServiceBase {
    public pager: SimplePager;
    constructor(stateManager: NgQueryStringStateService) {
        super(new SimplePager(), stateManager);
    }
    public wrap(target: any): NgListService {
        super.wrap(target);
        return this;
    }
}
