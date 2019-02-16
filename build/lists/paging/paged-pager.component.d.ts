import { EventEmitter, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { PagedPager } from 'e2e4';
import { Observable } from 'rxjs';
import { RTList } from '../providers/list';
export declare class PagedPagerComponent implements OnChanges, OnInit {
    pager: PagedPager;
    listService: RTList;
    defaultPageSize: number;
    maxPageSize: number;
    minPageSize: number;
    constructor(pager: PagedPager, listService: RTList);
    ngOnInit(): void;
    ngOnChanges(changes: {
        defaultPageSize?: SimpleChange;
        maxPageSize?: SimpleChange;
        minPageSize?: SimpleChange;
    }): void;
    readonly canMoveForward: boolean;
    readonly canMoveBackward: boolean;
    goToFirstPage(): Observable<any> | Promise<any> | EventEmitter<any>;
    goToLastPage(): Observable<any> | Promise<any> | EventEmitter<any>;
    goToNextPage(): Observable<any> | Promise<any> | EventEmitter<any>;
    goToPreviousPage(): Observable<any> | Promise<any> | EventEmitter<any>;
    loadData(): Observable<any> | Promise<any> | EventEmitter<any>;
}
