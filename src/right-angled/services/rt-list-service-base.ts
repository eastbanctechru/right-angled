import { Pager, Utility, AbstractLifetime, ProgressState } from 'e2e4';
import { RtStateManagementService } from './rt-state-management-service';
import { RtSortingsService, RtFiltersService } from './injectables';

export abstract class RtListServiceBase extends AbstractLifetime {
    public fetchMethod: (requestParams: any) => Promise<any>;
    public destroyOnReload: any;

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
    constructor(public pager: Pager, public stateService: RtStateManagementService, public sortingsService: RtSortingsService, public filtersService: RtFiltersService) {
        super();
        this.pager = pager;
        this.stateService.target = this;
        this.stateService.serializationKey = 'ls';
        this.filtersService.registerFilterTarget(this, this.pager, this.sortingsService);
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
        this.destroyReloadDestroyables();
    }
    protected destroyReloadDestroyables(): void {
        if (this.destroyOnReload) {
            if (Array.isArray(this.destroyOnReload)) {
                Utility.disposeAll(this.destroyOnReload);
                return;
            }
            if (this.destroyOnReload.hasOwnProperty('dispose')) {
                this.destroyOnReload.dispose();
            }
        }
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
        const promise = this.fetchMethod(this.toRequest());
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
