import { Injectable } from '@angular/core';
import { NgListServiceBase } from './ng-list-service-base';
import { BufferedPager } from 'e2e4';
import { NgQueryStringStateManager } from './ng-query-string-state-manager';
@Injectable()
export class NgBufferedListService extends NgListServiceBase {
    public pager: BufferedPager;
    constructor(stateManager: NgQueryStringStateManager) {
        super(new BufferedPager(), stateManager);
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
