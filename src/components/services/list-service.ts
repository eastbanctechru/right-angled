import { Injectable, EventEmitter } from '@angular/core';
import { Pager, Utility, ProgressState } from 'e2e4';
import { RtQueryStringStateService } from './query-string-state-service';
import { RtListLifetimeInfo, RtSortingsService, RtFiltersService } from './injectables';
import { AsyncSubscriber } from './async-subscriber';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RtListService {
    public fetchMethod: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>;
    public destroyOnReloadTarget: any;
    public pager: Pager;

    private loadSuccessCallback = (result: Object): Object => {
        this.pager.processResponse(result);
        this.lifetimeInfo.state = ProgressState.Done;
        // In case when filter changed from last request and theres no data now
        if (this.pager.totalCount === 0) {
            this.clearData();
        }
        return result;
    }
    private loadFailCallback = (): void => {
        this.lifetimeInfo.state = ProgressState.Fail;
    }
    private clearData(): void {
        this.pager.reset();
        this.destroyReloadDestroyables();
    }
    protected destroyReloadDestroyables(): void {
        if (this.destroyOnReloadTarget) {
            if (Array.isArray(this.destroyOnReloadTarget)) {
                Utility.disposeAll(this.destroyOnReloadTarget);
                return;
            }
            if (this.destroyOnReloadTarget.hasOwnProperty('dispose')) {
                this.destroyOnReloadTarget.dispose();
            }
        }
    }
    constructor(private asyncSubscriber: AsyncSubscriber, private lifetimeInfo: RtListLifetimeInfo, private stateService: RtQueryStringStateService, private sortingsService: RtSortingsService, private filtersService: RtFiltersService) {
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
        this.asyncSubscriber.dispose();
        this.lifetimeInfo.dispose();
        this.filtersService.dispose();
        this.sortingsService.dispose();
        this.clearData();
    }

    public loadData(): Promise<any> | Observable<any> | EventEmitter<any> {
        if (!this.lifetimeInfo.inited) {
            throw new Error('loadData can be called only after activation.');
        }
        this.pager.totalCount = 0;
        this.lifetimeInfo.state = ProgressState.Progress;
        let requestState = this.filtersService.getRequestState();
        const subscribable = this.fetchMethod(requestState);
        if (this.pager.appendedOnLoad === false) {
            this.destroyReloadDestroyables();
        }
        this.addToCancellationSequence(subscribable);
        this.asyncSubscriber.attach(subscribable, this.loadSuccessCallback, this.loadFailCallback);
        this.stateService.flushRequestState(requestState);
        this.stateService.persistLocalState(this.filtersService.getPersistedState());
        return subscribable;
    }
    public reloadData(): void {
        if (this.lifetimeInfo.ready) {
            this.clearData();
            this.loadData();
        }
    }
    private addToCancellationSequence(promise: Promise<any> | Observable<any> | EventEmitter<any>): void { // do nothing for now
    };
    public cancelRequests(): void {
        this.asyncSubscriber.detach();
        this.lifetimeInfo.state = ProgressState.Cancelled;
    };
}
