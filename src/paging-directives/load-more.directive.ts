import { Directive, HostBinding, HostListener, SkipSelf } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RtList } from './list';

@Directive({
    selector: '[rtLoadMore]'
})
export class LoadMoreDirective {
    constructor( @SkipSelf() private listService: RtList, @SkipSelf() private pager: BufferedPager) {
        if (pager === null) {
            throw new Error('[rtLoadMore] directive can be used only with buffered lists.');
        }
    }
    @HostListener('click', ['$event'])
    public loadMore(evt: MouseEvent): void {
        if (!this.disabled) {
            this.listService.loadData();
        }
        evt.preventDefault();
    }
    @HostBinding('attr.disabled')
    public get disabled(): boolean {
        return this.pager.skip >= this.pager.totalCount;
    }
}
