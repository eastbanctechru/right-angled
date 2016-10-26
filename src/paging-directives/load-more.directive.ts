import { Directive, HostListener, SkipSelf } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RtList } from '../core/list';

@Directive({
    selector: '[rtLoadMore]'
})
export class LoadMoreDirective {
    constructor( @SkipSelf() private listService: RtList, @SkipSelf() private pager: BufferedPager) {
    }
    @HostListener('click', ['$event'])
    public loadMore(evt: MouseEvent): void {
        if (this.pager.canLoadMore) {
            this.listService.loadData();
            evt.preventDefault();
        }
    }
}
