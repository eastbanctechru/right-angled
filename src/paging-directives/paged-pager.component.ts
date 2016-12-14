import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RTList, RTPagedPager } from '../core/index';

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
    public ngOnChanges(changes: { defaultPageSize?: SimpleChange, maxPageSize?: SimpleChange, minPageSize?: SimpleChange }): void {
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
    public goToFirstPage(): void {
        if (this.pager.tryMoveToFirstPage()) {
            this.listService.loadData();
        }
    }
    public goToLastPage(): void {
        if (this.pager.tryMoveToLastPage()) {
            this.listService.loadData();
        }
    }
    public goToNextPage(): void {
        if (this.pager.tryMoveToNextPage()) {
            this.listService.loadData();
        }
    }
    public goToPreviousPage(): void {
        if (this.pager.tryMoveToPreviousPage()) {
            this.listService.loadData();
        }
    }
    public loadData(): void {
        this.listService.loadData();
    }
}
