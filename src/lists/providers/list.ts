// tslint:disable:max-classes-per-file

import { EventEmitter, Inject, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import {
    AsyncSubscriber,
    BufferedPager,
    FiltersService,
    List,
    ListResponse,
    OperationStatus,
    PagedPager,
    SortingsService,
    StateService
} from 'e2e4';
import { Observable } from 'rxjs';
import { RTFiltersService } from '../../filters/filters-service';
// tslint:disable-next-line:variable-name
export const RTFilterTarget = new InjectionToken<any>('RTFilterTarget');

export abstract class RTStateService extends StateService {}

export class RTOperationStatus {
    public status: OperationStatus;
}

@Injectable()
export class RTList extends List {
    public loadStarted: EventEmitter<void> = new EventEmitter<void>();
    public loadSucceed: EventEmitter<ListResponse<any> | any[]> = new EventEmitter<ListResponse<any> | any[]>();
    public loadFailed: EventEmitter<any> = new EventEmitter<any>();
    private filterTargets: object[] = [];
    constructor(
        asyncSubscriber: AsyncSubscriber,
        @Optional() stateServices: RTStateService,
        @SkipSelf()
        @Optional()
        @Inject(RTFilterTarget)
        filterTargets: any,
        sortingsService: SortingsService,
        filtersService: FiltersService
    ) {
        super(asyncSubscriber, stateServices, sortingsService, filtersService);
        if (filterTargets != null) {
            if (Array.isArray(filterTargets)) {
                this.filterTargets.push(...filterTargets);
            } else {
                this.filterTargets.push(filterTargets);
            }
        }
    }
    public loadSuccessCallback(response: ListResponse<any> | any[]): ListResponse<any> | any[] {
        const result = super.loadSuccessCallback(response);
        this.loadSucceed.emit(result);
        return result;
    }
    public loadFailCallback(): void {
        super.loadFailCallback();
        this.loadFailed.emit();
    }

    public loadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        const subscribable = super.loadData();
        this.loadStarted.emit();
        return subscribable;
    }
    public reloadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        const subscribable = super.reloadData();
        this.loadStarted.emit();
        return subscribable;
    }
    public init(): void {
        this.filtersService.registerFilterTarget(...this.filterTargets);
        super.init();
    }
}

@Injectable()
export class RTPagedPager extends PagedPager {}

@Injectable()
export class RTBufferedPager extends BufferedPager {}

@Injectable()
export class RTSortingsService extends SortingsService {}

export let LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RTList,
    { provide: FiltersService, useClass: RTFiltersService },
    { provide: RTOperationStatus, useExisting: RTList },
    { provide: SortingsService, useClass: RTSortingsService }
];
