import { Injectable } from '@angular/core';

import { RtSortingsService, RtFiltersService, RtSimplePager } from './injectables';
import { RtListServiceBase } from './rt-list-service-base';
import { RtQueryStringStateService } from './rt-query-string-state-service';

@Injectable()
export class RtListService extends RtListServiceBase {
    constructor(public pager: RtSimplePager, stateManagementService: RtQueryStringStateService, sortingsService: RtSortingsService, filtersService: RtFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
}
