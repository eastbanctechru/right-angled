import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { PagedPager } from 'e2e4';

import { RtList } from '../core/list';
import { RtPagedPager } from '../providers';

@Component({
    providers: [{ provide: PagedPager, useClass: RtPagedPager }],
    selector: 'rt-paged-pager',
    template: '<ng-content></ng-content>'
})
export class PagedPagerComponent implements OnChanges, OnInit {
    @Input() public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    @Input() public maxPageSize: number = PagedPager.settings.maxPageSize;
    @Input() public minPageSize: number = PagedPager.settings.minPageSize;

    constructor(public pager: PagedPager, listService: RtList) {
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
}
