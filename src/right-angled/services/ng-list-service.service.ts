import { Injectable } from '@angular/core';

import { RtSortingsService, RtFiltersService, RtSimplePager } from './injectables';
import { RtListServiceBase } from './ng-list-service-base';
import { RtQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class RtListService extends RtListServiceBase {
    constructor(public pager: RtSimplePager, stateManagementService: RtQueryStringStateService, sortingsService: RtSortingsService, filtersService: RtFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
    public wrap(target: any): RtListService {
        super.wrap(target);
        return this;
    }
}
