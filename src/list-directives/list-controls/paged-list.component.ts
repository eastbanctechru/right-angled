import { Component, EventEmitter, Input, OnChanges, OnInit, Self, SimpleChange } from '@angular/core';
import { PagedPager, SortParameter } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { PAGED_LIST_PROVIDERS } from '../../providers';
import { RtListService } from '../list-service';
import { ListBase } from './list-base';

@Component({
    exportAs: 'rtList',
    providers: [PAGED_LIST_PROVIDERS],
    selector: 'rt-paged-list',
    template: `<ng-content></ng-content>`
})
export class PagedListComponent extends ListBase implements OnChanges, OnInit {
    @Input() public defaultPageSize: number = PagedPager.settings.defaultPageSize;
    @Input() public maxPageSize: number = PagedPager.settings.maxPageSize;
    @Input() public minPageSize: number = PagedPager.settings.minPageSize;
    @Input() public defaultSortings: Array<SortParameter>;
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @Self() public listService: RtListService, @Self() public pager: PagedPager) {
        super(listService, pager);
    }
    public ngOnInit(): void {
        this.pager.pageSize = this.defaultPageSize * 1;
    }
    public ngOnChanges(changes: { defaultSortings?: SimpleChange, defaultPageSize?: SimpleChange, maxPageSize?: SimpleChange, minPageSize?: SimpleChange }): void {
        super.ngOnChanges(changes);
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
