import { Pager, Utility, AbstractLifetime, ProgressState, SortingsService, FiltersService } from 'e2e4';
import { StateManager } from './state-manager';

export abstract class NgListServiceBase extends AbstractLifetime {
    public dataReadDelegate: (requestParams: any) => Promise<any>;
    public sortingsService: SortingsService;
    public stateManager: StateManager;
    public filtersService: FiltersService;
    public pager: Pager;
    public items: Object[];

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
    constructor(pager: Pager, stateManager: StateManager) {
        super();
        this.pager = pager;
        this.stateManager = stateManager;
        this.stateManager.target = this;
        this.filtersService = new FiltersService(this);
        this.filtersService.registerFilterTarget(this.pager);
        this.sortingsService = new SortingsService();
        this.filtersService.registerFilterTarget(this.sortingsService);
    }
    public init(): void {
        const restoredState = this.stateManager.mergeStates();
        this.filtersService.applyParams(restoredState);
        super.init();
    }
    public toRequest(): any {
        return this.filtersService.getRequestState(null);
    }
    public getLocalState(): Object {
        return this.filtersService.getPersistedState(null);
    }
    public clearData(): void {
        this.pager.reset();
        Utility.disposeAll(this.items);
    }
    public getDataReadPromise(): Promise<Object> {
        return this.dataReadDelegate(this.toRequest());
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListServiceBase {
        this.dataReadDelegate = dataReadDelegate;
        this.filtersService.registerFilterTarget(target);
        return this;
    }
    public dispose(): void {
        super.dispose();
        this.filtersService.dispose();
        this.sortingsService.dispose();
        this.clearData();
    }

    public loadData(): Promise<Object> {
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
    public reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    private addToCancellationSequence(promise: Promise<Object>): void { // do nothing for now
    };
    public cancelRequests(): void { // do nothing for now
    };
}
