import { Injectable } from '@angular/core';

import { RtSortingsService, RtFiltersService, RtBufferedPager } from './injectables';
import { RtListServiceBase } from './ng-list-service-base';
import { RtQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class RtBufferedListService extends RtListServiceBase {
    constructor(public pager: RtBufferedPager, stateManagementService: RtQueryStringStateService, sortingsService: RtSortingsService, filtersService: RtFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
    public wrap(target: any): RtBufferedListService {
        super.wrap(target);
        return this;
    }
}
