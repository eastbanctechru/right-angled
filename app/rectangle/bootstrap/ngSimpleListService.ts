import {ProgressState} from 'e2e4/src/common/progressState';
import {SortManager} from 'e2e4/src/sortManager';
import {IStateManager} from './IStateManager';
import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {NgListServiceBase} from './ngListServiceBase';
import {SimplePager} from 'e2e4/src/simplePager';
import {FilterManager} from 'e2e4/src/filterManager';
import {IFilterManager} from 'e2e4/src/contracts/IFilterManager';
import {NullObjectStateManager} from './nullObjectStateManager';
import {Utility} from 'e2e4/src/common/utility';

export class NgSimpleListService extends NgListServiceBase {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    stateManager: IStateManager;
    pager: SimplePager;
    filterManager: IFilterManager;

    items: Object[];
    constructor() {
        super(new SimplePager());
        this.stateManager = new NullObjectStateManager();
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
    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        return promise;
    }

    dispose(): void {
        this.filterManager.dispose();
        this.sortManager.dispose();
        super.dispose();
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgSimpleListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    getDataReadPromise(): Promise<Object> {
        return this.dataReadDelegate(this.toRequest());
    }
}
