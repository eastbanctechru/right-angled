import { SkipSelf, HostListener, Directive } from '@angular/core';

import { RtListService, RtBufferedPager, RtNullObjectInjectable } from '../../services/index';

@Directive({
    selector: '[rtLoadMore]'
})
export class LoadMoreDirective {
    constructor( @SkipSelf() private listService: RtListService, @SkipSelf() private pager: RtBufferedPager) {
        if (pager === RtNullObjectInjectable.instance) {
            throw new Error('[rtLoadMore] directive can be used only with buffered lists.');
        }
    }
    @HostListener('click', ['$event'])
    public loadMore(evt: MouseEvent): void {
        this.listService.loadData();
        evt.preventDefault();
    }
}
