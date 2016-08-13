import { Injectable, EventEmitter } from '@angular/core';
import { Pager, destroyAll, ProgressState } from 'e2e4';
import { RtQueryStringStateService } from './query-string-state-service';
import { RtSortingsService, RtFiltersService } from './injectables';
import { RtLifetimeInfo } from './lifetime-info';
import { AsyncSubscriber } from './async-subscriber';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RtListService {
    public static settings: any = {
        itemsPropertyName: 'items'
    };
    public itemsPropertyName: string = RtListService.settings.itemsPropertyName;
    public fetchMethod: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>;
    public pager: Pager;
    public items: Array<any> = new Array<any>();
    public itemsStream: Subject<Array<any>> = Subject.create();

    private loadSuccessCallback = (result: Object): Object => {
        this.items.push(...result[this.itemsPropertyName]);
        this.itemsStream.next(this.items);

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
        destroyAll(this.items);
    }
    constructor(private asyncSubscriber: AsyncSubscriber, private lifetimeInfo: RtLifetimeInfo, private stateService: RtQueryStringStateService, private sortingsService: RtSortingsService, private filtersService: RtFiltersService) {
        this.stateService.serializationKey = 'ls';
    }
    public init(): void {
        if (this.lifetimeInfo.inited) {
            return;
        }
        this.filtersService.registerFilterTarget(this, this.pager, this.sortingsService);
        const restoredState = this.stateService.mergeStates();
        this.filtersService.applyParams(restoredState);
        this.lifetimeInfo.init();
    }
    public destroy(): void {
        this.asyncSubscriber.destroy();
        this.lifetimeInfo.destroy();
        this.filtersService.destroy();
        this.sortingsService.destroy();
        this.clearData();
        this.itemsStream.complete();
    }

    public loadData(): Promise<any> | Observable<any> | EventEmitter<any> {
        this.pager.totalCount = 0;
        this.lifetimeInfo.state = ProgressState.Progress;
        let requestState = this.filtersService.getRequestState();
        const subscribable = this.fetchMethod(requestState);
        if (this.pager.appendedOnLoad === false) {
            destroyAll(this.items);
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
