import {IPager, ISortManager, IFilterManager, Utility, AbstractLifetime, ProgressState, SortManager, FilterManager} from 'e2e4';
import {NullObjectStateManager} from './nullObjectStateManager';
import {IStateManager} from './IStateManager';

export abstract class NgListServiceBase extends AbstractLifetime {
    private listLoadDataSuccessCallback = (result: Object): Object => {
        this.pager.processResponse(result);
        this.state = ProgressState.Done;
        // In case when filter changed from last request and theres no data now
        if (this.pager.totalCount === 0) {
            this.clearData();
        }
        return result;
    }
    private listLoadDataFailCallback = (): void => {
        this.state = ProgressState.Fail;
    }
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    stateManager: IStateManager;
    filterManager: IFilterManager;
    pager: IPager;
    items: Object[];

    constructor(pager: IPager) {
        super();
        this.pager = pager;
        this.stateManager = new NullObjectStateManager();
        this.stateManager.target = this;
        this.filterManager = new FilterManager(this);
        this.filterManager.registerFilterTarget(this.pager);
        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        const restoredState = this.stateManager.mergeStates({});
        this.filterManager.applyParams(restoredState);
        this.init();
    }
    toRequest(): any {
        return this.filterManager.getRequestState(null);
    }
    getLocalState(): Object {
        return this.filterManager.getPersistedState(null);
    }
    clearData(): void {
        this.pager.reset();
        Utility.disposeAll(this.items);
    }
    getDataReadPromise(): Promise<Object> {
        return this.dataReadDelegate(this.toRequest());
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListServiceBase {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    dispose(): void {
        super.dispose();
        this.filterManager.dispose();
        this.sortManager.dispose();
        this.clearData();
    }

    loadData(): Promise<Object> {
        if (!this.inited) {
            throw new Error('loadData can be called only after activation.');
        }
        this.pager.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise();
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessCallback, this.listLoadDataFailCallback);
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        return promise;
    }
    reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    addToCancellationSequence(promise: Promise<Object>): void { };
    cancelRequests(): void { };
}
