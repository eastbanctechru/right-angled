import {Utility} from 'e2e4/src/common/utility';
import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {IStateManager} from './IStateManager';
import {SortManager} from 'e2e4/src/sortManager';
import {List} from 'e2e4/src/list';
import {PagedPager} from 'e2e4/src/pagedPager';
import {NullObjectStateManager} from './nullObjectStateManager';

export class NgPagedListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    stateManager: IStateManager;
    pager: PagedPager;
    items: Object[];
    constructor() {
        super(new PagedPager());
        this.stateManager = new NullObjectStateManager()
        this.stateManager.target = this;

        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        const restoredState = this.stateManager.mergeStates({});
        super.init(restoredState);

    }
    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        Utility.disposeAll(this.items);
        return promise;
    }
    clearData(): void {
        super.clearData();
        Utility.disposeAll(this.items);
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
