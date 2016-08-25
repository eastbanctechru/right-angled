import { EventEmitter, Injectable } from '@angular/core';
import { FiltersService, Pager, ProgressState, SortingsService, destroyAll } from 'e2e4';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AsyncSubscriber } from './async-subscriber';
import { RtLocalStoragePersistenceService } from './local-storage-persistence-service';
import { RtQueryStringStateService } from './query-string-state-service';
import { RtSessionStoragePersistenceService } from './session-storage-persistence-service';

@Injectable()
export class RtListService {
    // tslint:disable-next-line: typedef
    public static settings = {
        itemsPropertyName: 'items',
        persistanceEnabled: true
    };
    public itemsPropertyName: string = RtListService.settings.itemsPropertyName;
    public persistanceEnabled: boolean = RtListService.settings.persistanceEnabled;

    public fetchMethod: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>;
    public pager: Pager;
    public items: Array<any> = new Array<any>();
    public itemsStream: Subject<Array<any>> = Subject.create();

    /**
     * True if object was already destroyed via {@link destroy} call.  
     */
    public destroyed: boolean = false;
    /**
     * True if object was already inited via {@link init} call.  
     */
    public inited: boolean = false;
    /**
     * Текущее состояние объекта.  
     */
    public state: ProgressState = ProgressState.Initial;
    /**
     * Вычисляемое свойство, указывающее что текущее состояние {@link AbstractLifetime.state} равно {@link ProgressState.Progress}.
     * Реализовано для удобства использования в шаблонах.  
     */
    public get busy(): boolean {
        return this.state === ProgressState.Progress;
    }
    /**
     * Вычисляемое свойство, указывающее что текущее состояние {@link AbstractLifetime.state} НЕ равно {@link ProgressState.Progress}.
     * Реализовано для удобства использования в шаблонах.  
     */
    public get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }
    private loadSuccessCallback = (result: Object): Object => {
        this.items = this.items.concat(result[this.itemsPropertyName]);
        this.itemsStream.next(this.items);

        this.pager.processResponse(result);
        this.state = ProgressState.Done;
        // In case when filter changed from last request and theres no data now
        if (this.pager.totalCount === 0) {
            this.clearData();
        }
        return result;
    }
    private loadFailCallback = (): void => {
        this.state = ProgressState.Fail;
    }
    private clearData(): void {
        this.pager.reset();
        destroyAll(this.items);
        this.items = [];
        this.itemsStream.next(this.items);
    }
    constructor(
        private asyncSubscriber: AsyncSubscriber,
        public stateService: RtQueryStringStateService,
        public localStorageService: RtLocalStoragePersistenceService,
        public sessionStorageService: RtSessionStoragePersistenceService,
        public sortingsService: SortingsService,
        public filtersService: FiltersService) {

    }
    public init(): void {
        if (this.inited) {
            return;
        }
        this.filtersService.registerFilterTarget(this, this.pager, this.sortingsService);
        const restoredState = this.persistanceEnabled ? this.stateService.getPersistedState() : {};
        const persistedState = this.persistanceEnabled ? this.localStorageService.getPersistedState() : {};
        const sessionState = this.persistanceEnabled ? this.sessionStorageService.getPersistedState() : {};
        Object.assign(restoredState, persistedState || {}, sessionState || {});

        this.filtersService.applyParams(restoredState);
        this.inited = true;
    }
    public destroy(): void {
        this.asyncSubscriber.destroy();
        this.filtersService.destroy();
        this.sortingsService.destroy();
        this.clearData();
        this.itemsStream.complete();
        this.destroyed = true;
    }

    public loadData(): Promise<any> | Observable<any> | EventEmitter<any> {
        this.pager.totalCount = 0;
        this.state = ProgressState.Progress;
        let requestState = this.filtersService.getRequestState();
        const subscribable = this.fetchMethod(requestState);
        if (this.pager.appendedOnLoad === false) {
            destroyAll(this.items);
            this.items = [];
            this.itemsStream.next(this.items);
        }
        this.addToCancellationSequence(subscribable);
        this.asyncSubscriber.attach(subscribable, this.loadSuccessCallback, this.loadFailCallback);
        if (this.persistanceEnabled) {
            this.stateService.persistState(this.filtersService);
            this.sessionStorageService.persistState(this.filtersService);
            this.localStorageService.persistState(this.filtersService.getPersistedState());
        }
        return subscribable;
    }
    public reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    private addToCancellationSequence(promise: Promise<any> | Observable<any> | EventEmitter<any>): void { // do nothing for now
    };
    public cancelRequests(): void {
        this.asyncSubscriber.detach();
        this.state = ProgressState.Cancelled;
    };
}
