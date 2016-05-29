import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {IStateManager} from './IStateManager';
import {SortManager} from 'e2e4/src/sortManager';
import {NgListServiceBase} from './ngListServiceBase';
import {BufferedPager} from 'e2e4/src/bufferedPager';
import {NullObjectStateManager} from './nullObjectStateManager';
import {FilterManager} from 'e2e4/src/filterManager';
import {IFilterManager} from 'e2e4/src/contracts/IFilterManager';

import {Utility} from 'e2e4/src/common/utility';

export class NgBufferedListService extends NgListServiceBase {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    stateManager: IStateManager;
    filterManager: IFilterManager;
    pager: BufferedPager;
    items: Object[];
    constructor() {
        super(new BufferedPager());
        this.stateManager = new NullObjectStateManager()
        this.stateManager.target = this;

        this.filterManager = new FilterManager(this);
        this.filterManager.registerFilterTarget(this.pager);


        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        const restoredState = this.stateManager.mergeStates({});
        this.filterManager.applyParams(restoredState);
        super.init();
    }
    toRequest(): any {
        return this.filterManager.getRequestState(null);
    }
    getLocalState(): Object {
        return this.filterManager.getPersistedState(null);
    }

    clearData(): void {
        super.clearData();
        Utility.disposeAll(this.items);
    }
    dispose(): void {
        this.filterManager.dispose();
        this.sortManager.dispose();
        super.dispose();
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    loadData(): Promise<Object> {
        const promise = super.loadData();
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        return promise;
    }
    getDataReadPromise(): Promise<Object> {
        return this.dataReadDelegate(this.toRequest());
    }
}
