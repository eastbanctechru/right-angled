import { SkipSelf, HostListener, Directive } from '@angular/core';
import { RtListComponent } from '../../lists/list.component';
import { NgBufferedListService } from '../../bootstrap/ngBufferedListService';

@Directive({
    selector: '[rt-load-more]'
})
export class RtLoadMoreDirective {
    public bufferedListService: NgBufferedListService;
    constructor( @SkipSelf() listHost: RtListComponent) {
        if (!listHost.isBufferedList) {
            throw new Error('[rt-load-more] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
    }
    @HostListener('click', ['$event'])
    public loadMore(evt: MouseEvent): void {
        this.bufferedListService.loadData();
        evt.preventDefault();
    }
}
