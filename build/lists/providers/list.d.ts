import { EventEmitter, InjectionToken } from '@angular/core';
import { AsyncSubscriber, BufferedPager, FiltersService, List, ListResponse, OperationStatus, PagedPager, SortingsService, StateService } from 'e2e4';
import { Observable } from 'rxjs';
export declare const RTFilterTarget: InjectionToken<any>;
export declare abstract class RTStateService extends StateService {
}
export declare class RTOperationStatus {
    status: OperationStatus;
}
export declare class RTList extends List {
    loadStarted: EventEmitter<void>;
    loadSucceed: EventEmitter<ListResponse<any> | any[]>;
    loadFailed: EventEmitter<any>;
    private filterTargets;
    constructor(asyncSubscriber: AsyncSubscriber, stateServices: RTStateService, filterTargets: any, sortingsService: SortingsService, filtersService: FiltersService);
    loadSuccessCallback(response: ListResponse<any> | any[]): ListResponse<any> | any[];
    loadFailCallback(): void;
    loadData(): Observable<any> | Promise<any> | EventEmitter<any>;
    reloadData(): Observable<any> | Promise<any> | EventEmitter<any>;
    init(): void;
}
export declare class RTPagedPager extends PagedPager {
}
export declare class RTBufferedPager extends BufferedPager {
}
export declare class RTSortingsService extends SortingsService {
}
export declare let LIST_PROVIDERS: any[];
