import {Utility} from 'e2e4/src/common/utility';
import {NgListServiceBase} from './ngListServiceBase';
import {PagedPager} from 'e2e4/src/pagedPager';

export class NgPagedListService extends NgListServiceBase {
    pager: PagedPager;
    constructor() {
        super(new PagedPager());
    }
    loadData(): Promise<Object> {
        const promise = super.loadData();
        Utility.disposeAll(this.items);
        return promise;
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgPagedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }

    goToFirstPage(): void {
        if ((<PagedPager>this.pager).pageNumber > 1) {
            (<PagedPager>this.pager).pageNumber = 1;
            this.loadData();
        }
    }
    goToPreviousPage(): void {
        if ((<PagedPager>this.pager).pageNumber > 1) {
            (<PagedPager>this.pager).pageNumber -= 1;
            this.loadData();
        }
    }
    goToNextPage(): void {
        if ((<PagedPager>this.pager).pageNumber < (<PagedPager>this.pager).pageCount) {
            (<PagedPager>this.pager).pageNumber += 1;
            this.loadData();
        }
    }
    goToLastPage(): void {
        if ((<PagedPager>this.pager).pageNumber < (<PagedPager>this.pager).pageCount) {
            (<PagedPager>this.pager).pageNumber = (<PagedPager>this.pager).pageCount;
            this.loadData();
        }
    }
}
