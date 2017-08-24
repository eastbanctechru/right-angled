// tslint:disable:max-classes-per-file

import { EventEmitter, Inject, Injectable, InjectionToken, Optional, SkipSelf } from "@angular/core";
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
} from "e2e4";
import { Observable } from "rxjs/Observable";
import { RTFiltersService } from "../../filters/filters-service";

export const RTFilterTarget = new InjectionToken("RTFilterTarget");

export abstract class RTStateService extends StateService {}

export class RTOperationStatus {
    public status: OperationStatus;
}

@Injectable()
export class RTList extends List {
    public onLoadSucceed: EventEmitter<ListResponse<any> | any[]> = new EventEmitter<ListResponse<any> | any[]>();
    public onLoadFailed: EventEmitter<any> = new EventEmitter<any>();
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
        this.onLoadSucceed.emit(result);
        return result;
    }
    public loadFailCallback(): void {
        super.loadFailCallback();
        this.onLoadFailed.emit();
    }

    public loadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        return super.loadData();
    }
    public reloadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        return super.reloadData();
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
