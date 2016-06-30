import { PagedPager, Utility } from 'e2e4';
import { NgListServiceBase } from './ngListServiceBase';

export class NgPagedListService extends NgListServiceBase {
    public pager: PagedPager;
    constructor() {
        super(new PagedPager());
    }
    public loadData(): Promise<Object> {
        const promise = super.loadData();
        Utility.disposeAll(this.items);
        return promise;
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgPagedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }

    public goToFirstPage(): void {
        if ((<PagedPager>this.pager).pageNumber > 1) {
            (<PagedPager>this.pager).pageNumber = 1;
            this.loadData();
        }
    }
    public goToPreviousPage(): void {
        if ((<PagedPager>this.pager).pageNumber > 1) {
            (<PagedPager>this.pager).pageNumber -= 1;
            this.loadData();
        }
    }
    public goToNextPage(): void {
        if ((<PagedPager>this.pager).pageNumber < (<PagedPager>this.pager).pageCount) {
            (<PagedPager>this.pager).pageNumber += 1;
            this.loadData();
        }
    }
    public goToLastPage(): void {
        if ((<PagedPager>this.pager).pageNumber < (<PagedPager>this.pager).pageCount) {
            (<PagedPager>this.pager).pageNumber = (<PagedPager>this.pager).pageCount;
            this.loadData();
        }
    }
}
