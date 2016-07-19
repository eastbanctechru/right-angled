import { Injectable } from '@angular/core';

import { NgSortingsService, NgFiltersService, NgSimplePager } from './injectables';
import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgListService extends NgListServiceBase {
    constructor(public pager: NgSimplePager, stateManagementService: NgQueryStringStateService, sortingsService: NgSortingsService, filtersService: NgFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
    public wrap(target: any): NgListService {
        super.wrap(target);
        return this;
    }
}
