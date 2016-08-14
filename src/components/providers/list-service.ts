import { Injectable, EventEmitter } from '@angular/core';
import { Pager, destroyAll, ProgressState } from 'e2e4';
import { RtQueryStringStateService } from './query-string-state-service';
import { RtSortingsService, RtFiltersService } from './injectables';
import { AsyncSubscriber } from './async-subscriber';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RtListService {
    // tslint:disable-next-line: typedef
    public static settings = {
        itemsPropertyName: 'items',
        stateSerializationKeyName: 'ls'
    };
    public itemsPropertyName: string = RtListService.settings.itemsPropertyName;

    public fetchMethod: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>;
    public pager: Pager;
    public items: Array<any> = new Array<any>();

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
        this.items.push(...result[this.itemsPropertyName]);

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
    }
    constructor(private asyncSubscriber: AsyncSubscriber, private stateService: RtQueryStringStateService, private sortingsService: RtSortingsService, private filtersService: RtFiltersService) {
        this.stateService.serializationKey = RtListService.settings.stateSerializationKeyName;
    }
    public init(): void {
        if (this.inited) {
            return;
        }
        this.filtersService.registerFilterTarget(this, this.pager, this.sortingsService);
        const restoredState = this.stateService.mergeStates();
        this.filtersService.applyParams(restoredState);
        this.inited = true;
    }
    public destroy(): void {
        this.asyncSubscriber.destroy();
        this.filtersService.destroy();
        this.sortingsService.destroy();
        this.clearData();
        this.destroyed = true;
    }

    public loadData(): Promise<any> | Observable<any> | EventEmitter<any> {
        this.pager.totalCount = 0;
        this.state = ProgressState.Progress;
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
