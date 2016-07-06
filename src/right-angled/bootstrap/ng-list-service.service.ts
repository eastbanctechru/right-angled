import { Injectable } from '@angular/core';
import { NgListServiceBase } from './ng-list-service-base';
import { SimplePager } from 'e2e4';
import { NgQueryStringStateManager } from './ng-query-string-state-manager';
@Injectable()
export class NgListService extends NgListServiceBase {
    public pager: SimplePager;
    constructor(stateManager: NgQueryStringStateManager) {
        super(new SimplePager(), stateManager);
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
