import { SkipSelf, HostListener, Directive } from '@angular/core';
import { RtListComponent } from '../list-components/list.component';
import { NgBufferedListService } from '../bootstrap/ng-buffered-list-service.service';

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
