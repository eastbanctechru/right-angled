import { Injectable } from '@angular/core';
import { NgPagedPager } from './injectables';


import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgPagedListService extends NgListServiceBase {
    constructor(public pager: NgPagedPager, stateManager: NgQueryStringStateService) {
        super(pager, stateManager);
    }
    public loadData(): Promise<Object> {
        const promise = super.loadData();
        this.disposeReloadDisposals();
        return promise;
    }
    public wrap(target: any): NgPagedListService {
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
