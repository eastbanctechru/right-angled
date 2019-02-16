import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { PagedPager } from 'e2e4';
import { Observable } from 'rxjs';

import { RTList, RTPagedPager } from '../providers/list';

@Component({
    providers: [{ provide: PagedPager, useClass: RTPagedPager }],
    selector: 'rt-paged-pager',
    template: '<ng-content></ng-content>'
})
export class PagedPagerComponent implements OnChanges, OnInit {
    @Input() public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    @Input() public maxPageSize: number = PagedPager.settings.maxPageSize;
    @Input() public minPageSize: number = PagedPager.settings.minPageSize;

    constructor(public pager: PagedPager, public listService: RTList) {
        listService.pager = pager;
    }
    public ngOnInit(): void {
        this.pager.pageSize = this.defaultPageSize * 1;
    }
    public ngOnChanges(changes: { defaultPageSize?: SimpleChange; maxPageSize?: SimpleChange; minPageSize?: SimpleChange }): void {
        if (changes.defaultPageSize) {
            this.pager.defaultPageSize = changes.defaultPageSize.currentValue * 1;
        }
        if (changes.maxPageSize) {
            this.pager.maxPageSize = changes.maxPageSize.currentValue * 1;
        }
        if (changes.minPageSize) {
            this.pager.minPageSize = changes.minPageSize.currentValue * 1;
        }
    }
    public get canMoveForward(): boolean {
        return this.pager.canMoveForward;
    }
    public get canMoveBackward(): boolean {
        return this.pager.canMoveBackward;
    }
    public goToFirstPage(): Observable<any> | Promise<any> | EventEmitter<any> {
        if (this.pager.tryMoveToFirstPage()) {
            return this.listService.loadData();
        }
        return null;
    }
    public goToLastPage(): Observable<any> | Promise<any> | EventEmitter<any> {
        if (this.pager.tryMoveToLastPage()) {
            return this.listService.loadData();
        }
        return null;
    }
    public goToNextPage(): Observable<any> | Promise<any> | EventEmitter<any> {
        if (this.pager.tryMoveToNextPage()) {
            return this.listService.loadData();
        }
        return null;
    }
    public goToPreviousPage(): Observable<any> | Promise<any> | EventEmitter<any> {
        if (this.pager.tryMoveToPreviousPage()) {
            return this.listService.loadData();
        }
        return null;
    }
    public loadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        return this.listService.loadData();
    }
}
