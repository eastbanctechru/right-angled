import { AfterViewInit, EventEmitter, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { ListRequest, ListResponse, SortingsService, SortParameter } from 'e2e4';
import { Observable } from 'rxjs';
import { RTList } from './providers/list';
export declare class ListDirective implements OnChanges, OnDestroy, AfterViewInit {
    listService: RTList;
    sortingsService: SortingsService;
    readonly listInit: EventEmitter<RTList>;
    readonly afterListInit: EventEmitter<RTList>;
    readonly loadSucceed: EventEmitter<ListResponse<any> | any[]>;
    readonly loadFailed: EventEmitter<any>;
    readonly loadStarted: EventEmitter<void>;
    defaultSortings: SortParameter[];
    loadOnInit: boolean;
    keepRecordsOnLoad: boolean;
    fetchMethod: (requestParams: ListRequest) => Promise<ListResponse<any>> | Observable<ListResponse<any>> | EventEmitter<ListResponse<any>>;
    private successSubscription;
    private failSubscription;
    private loadStartedSubscription;
    constructor(listService: RTList, sortingsService: SortingsService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        keepRecordsOnLoad?: SimpleChange;
        defaultSortings?: SimpleChange;
    }): void;
    reloadData(): Observable<any> | Promise<any> | EventEmitter<any>;
    loadData(): Observable<any> | Promise<any> | EventEmitter<any>;
    resetSettings(): void;
    cancelRequests(): void;
    readonly items: any[];
    readonly busy: boolean;
    readonly ready: boolean;
}
