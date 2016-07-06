import { Injectable } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgBufferedListService extends NgListServiceBase {
    public pager: BufferedPager;
    constructor(stateManager: NgQueryStringStateService) {
        super(new BufferedPager(), stateManager);
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
