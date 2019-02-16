import { EventEmitter, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { Observable } from 'rxjs';
import { RTList } from '../providers/list';
export declare class BufferedPagerComponent implements OnChanges, OnInit {
    pager: BufferedPager;
    listService: RTList;
    defaultRowCount: number;
    maxRowCount: number;
    minRowCount: number;
    constructor(pager: BufferedPager, listService: RTList);
    ngOnInit(): void;
    ngOnChanges(changes: {
        defaultRowCount?: SimpleChange;
        maxRowCount?: SimpleChange;
        minRowCount?: SimpleChange;
    }): void;
    readonly canLoadMore: boolean;
    loadMore(): Observable<any> | Promise<any> | EventEmitter<any>;
}
