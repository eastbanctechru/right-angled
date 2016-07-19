import { Pager, Utility, AbstractLifetime, ProgressState, SortingsService, FiltersService } from 'e2e4';
import { NgStateManagementService } from './ng-state-management-service';
import { DISPOSE_ON_RELOAD_METADATA_KEY } from '../dispose-on-reload.annotation';

export abstract class NgListServiceBase extends AbstractLifetime {
    public dataReadDelegate: (requestParams: any) => Promise<any>;
    public sortingsService: SortingsService;
    public stateService: NgStateManagementService;
    public filtersService: FiltersService;
    public pager: Pager;
    public target: any;

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
    constructor(pager: Pager, stateService: NgStateManagementService) {
        super();
        this.pager = pager;
        this.stateService = stateService;
        this.stateService.target = this;
        this.filtersService = new FiltersService(this);
        this.filtersService.registerFilterTarget(this.pager);
        this.sortingsService = new SortingsService();
        this.filtersService.registerFilterTarget(this.sortingsService);
    }
    public init(): void {
        const restoredState = this.stateService.mergeStates();
        this.filtersService.applyParams(restoredState);
        super.init();
    }
    public toRequest(): any {
        return this.filtersService.getRequestState(null);
    }
    public getLocalState(): Object {
        return this.filtersService.getPersistedState(null);
    }
    private clearData(): void {
        this.pager.reset();
        this.disposeReloadDisposals();
    }
    protected disposeReloadDisposals(): void {
        let disposeKeys: Array<string> = Reflect.getMetadata(DISPOSE_ON_RELOAD_METADATA_KEY, this.target);
        if (disposeKeys !== undefined && disposeKeys.length) {
            disposeKeys.forEach((key: string) => {
                if (Array.isArray(this.target[key])) {
                    Utility.disposeAll(this.target[key]);
                    return;
                }
                if (this.target[key].hasOwnProperty('dispose')) {
                    this.target[key].dispose();
                }
            });
        }
    }
    public getDataReadPromise(): Promise<Object> {
        return this.dataReadDelegate(this.toRequest());
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListServiceBase {
        this.target = target;
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
        this.stateService.flushRequestState(this.toRequest());
        this.stateService.persistLocalState(this.getLocalState());
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
