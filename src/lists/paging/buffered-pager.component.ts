import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { Observable } from 'rxjs/Observable';
import { RTBufferedPager, RTList } from '../providers/list';

@Component({
    providers: [{ provide: BufferedPager, useClass: RTBufferedPager }],
    selector: 'rt-buffered-pager',
    template: '<ng-content></ng-content>'
})
export class BufferedPagerComponent implements OnChanges, OnInit {
    @Input() public defaultRowCount: number = RTBufferedPager.settings.defaultRowCount;
    @Input() public maxRowCount: number = RTBufferedPager.settings.maxRowCount;
    @Input() public minRowCount: number = RTBufferedPager.settings.minRowCount;

    constructor(public pager: BufferedPager, public listService: RTList) {
        this.listService.pager = pager;
    }
    public ngOnInit(): void {
        this.pager.takeRowCount = this.defaultRowCount * 1;
    }
    public ngOnChanges(changes: {
        defaultRowCount?: SimpleChange;
        maxRowCount?: SimpleChange;
        minRowCount?: SimpleChange;
    }): void {
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
    public get canLoadMore(): boolean {
        return this.pager.canLoadMore;
    }
    public loadMore(): Observable<any> | Promise<any> | EventEmitter<any> {
        if (this.canLoadMore) {
            return this.listService.loadData();
        }
        return null;
    }
}
