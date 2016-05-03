import {Utility} from 'e2e4/src/common/utility';
import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {SortManager} from 'e2e4/src/SortManager';
import {List} from 'e2e4/src/list';
import {PagedPager} from 'e2e4/src/pagedPager';
import {NullObjectStateManager} from './NullObjectStateManager';

export class NgPagedListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    pager: PagedPager;
    constructor() {
        super(new NullObjectStateManager(), new PagedPager());
        (<NullObjectStateManager>this.stateManager).target = this;
        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        super.init({});
    }
    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        Utility.disposeAll(this.items);
        return promise;
    }
    dispose(): void {
        this.sortManager.dispose();
        super.dispose();
    }

    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgPagedListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
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
