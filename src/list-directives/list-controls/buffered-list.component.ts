import { Component, EventEmitter, Input, OnChanges, OnInit, Self, SimpleChange } from '@angular/core';
import { BufferedPager, SortParameter } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { BUFFERED_LIST_PROVIDERS } from '../../providers';
import { RtListService } from '../list-service';
import { ListBase } from './list-base';

@Component({
    exportAs: 'rtList',
    providers: [BUFFERED_LIST_PROVIDERS],
    selector: 'rt-buffered-list',
    template: `<ng-content></ng-content>`
})
export class BufferedListComponent extends ListBase implements OnChanges, OnInit {
    @Input() public defaultRowCount: number = BufferedPager.settings.defaultRowCount;
    @Input() public maxRowCount: number = BufferedPager.settings.maxRowCount;
    @Input() public minRowCount: number = BufferedPager.settings.minRowCount;
    @Input() public defaultSortings: Array<SortParameter>;
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @Self() public listService: RtListService, @Self() public pager: BufferedPager) {
        super(listService, pager);
    }
    public ngOnInit(): void {
        this.pager.takeRowCount = this.defaultRowCount * 1;
        super.ngOnInit();
    }
    public ngOnChanges(changes: { defaultSortings?: SimpleChange, defaultRowCount?: SimpleChange, maxRowCount?: SimpleChange, minRowCount?: SimpleChange }): void {
        super.ngOnChanges(changes);
        if (changes.defaultRowCount) {
            this.pager.defaultRowCount = changes.defaultRowCount.currentValue * 1;
        }
        if (changes.maxRowCount) {
            this.pager.maxRowCount = changes.maxRowCount.currentValue * 1;
        }
        if (changes.minRowCount) {
            this.pager.minRowCount = changes.minRowCount.currentValue * 1;
        }
    }
}
