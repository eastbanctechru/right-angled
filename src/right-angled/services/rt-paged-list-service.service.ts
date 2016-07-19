import { Injectable } from '@angular/core';

import { RtSortingsService, RtFiltersService, RtPagedPager } from './injectables';
import { RtListServiceBase } from './rt-list-service-base';
import { RtQueryStringStateService } from './rt-query-string-state-service';

@Injectable()
export class RtPagedListService extends RtListServiceBase {
    constructor(public pager: RtPagedPager, stateManagementService: RtQueryStringStateService, sortingsService: RtSortingsService, filtersService: RtFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
    public loadData(): Promise<Object> {
        const promise = super.loadData();
        this.destroyReloadDestroyables();
        return promise;
    }
    public wrap(target: any): RtPagedListService {
        super.wrap(target);
        return this;
    }
    public goToFirstPage(): void {
        if (this.pager.pageNumber > 1) {
            (this.pager).pageNumber = 1;
            this.loadData();
        }
    }
    public goToPreviousPage(): void {
        if (this.pager.pageNumber > 1) {
            this.pager.pageNumber -= 1;
            this.loadData();
        }
    }
    public goToNextPage(): void {
        if (this.pager.pageNumber < this.pager.pageCount) {
            this.pager.pageNumber += 1;
            this.loadData();
        }
    }
    public goToLastPage(): void {
        if (this.pager.pageNumber < this.pager.pageCount) {
            this.pager.pageNumber = this.pager.pageCount;
            this.loadData();
        }
    }
}
