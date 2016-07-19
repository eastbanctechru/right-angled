import { Injectable } from '@angular/core';

import { NgSortingsService, NgFiltersService, NgBufferedPager } from './injectables';
import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgBufferedListService extends NgListServiceBase {
    constructor(public pager: NgBufferedPager, stateManagementService: NgQueryStringStateService, sortingsService: NgSortingsService, filtersService: NgFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
    public wrap(target: any): NgBufferedListService {
        super.wrap(target);
        return this;
    }
}
