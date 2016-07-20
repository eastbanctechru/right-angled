import { Injectable } from '@angular/core';
import { Pager, Utility, ProgressState } from 'e2e4';
import { RtQueryStringStateService } from './rt-query-string-state-service';
import { RtListLifetimeInfo, RtSortingsService, RtFiltersService } from './injectables';

@Injectable()
export class RtListService {
    public fetchMethod: (requestParams: any) => Promise<any>;
    public destroyOnReload: any;
    public pager: Pager;

    private listLoadDataSuccessCallback = (result: Object): Object => {
        this.pager.processResponse(result);
        this.lifetimeInfo.state = ProgressState.Done;
        // In case when filter changed from last request and theres no data now
        if (this.pager.totalCount === 0) {
            this.clearData();
        }
        return result;
    }
    private listLoadDataFailCallback = (): void => {
        this.lifetimeInfo.state = ProgressState.Fail;
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
    constructor(private lifetimeInfo: RtListLifetimeInfo, private stateService: RtQueryStringStateService, private sortingsService: RtSortingsService, private filtersService: RtFiltersService) {
        this.stateService.stateKey = this;
        this.stateService.serializationKey = 'ls';
    }
    public init(): void {
        this.filtersService.registerFilterTarget(this, this.pager, this.sortingsService);
        const restoredState = this.stateService.mergeStates();
        this.filtersService.applyParams(restoredState);
        this.lifetimeInfo.init();
    }
    public dispose(): void {
        this.lifetimeInfo.dispose();
        this.filtersService.dispose();
        this.sortingsService.dispose();
        this.clearData();
    }

    public loadData(): Promise<Object> {
        if (!this.lifetimeInfo.inited) {
            throw new Error('loadData can be called only after activation.');
        }
        this.pager.totalCount = 0;
        this.lifetimeInfo.state = ProgressState.Progress;
        let requestState = this.filtersService.getRequestState();

        const promise = this.fetchMethod(requestState);
        if (this.pager.appendedOnLoad === false) {
            this.destroyReloadDestroyables();
        }

        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessCallback, this.listLoadDataFailCallback);
        this.stateService.flushRequestState(requestState);
        this.stateService.persistLocalState(this.filtersService.getPersistedState());
        return promise;
    }
    public reloadData(): void {
        if (this.lifetimeInfo.ready) {
            this.clearData();
            this.loadData();
        }
    }
    private addToCancellationSequence(promise: Promise<Object>): void { // do nothing for now
    };
    public cancelRequests(): void { // do nothing for now
    };
}
