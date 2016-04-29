import {Directive} from 'angular2/core';
import {RtList} from '../../lists/list';
import {NgBufferedListService} from '../../bootstrap/ngBufferedListService';

@Directive({
    host: {
        '(click)': 'loadMore($event)'
    },
    selector: '[rt-load-more]'
})
export class RtLoadMore {
    bufferedListService: NgBufferedListService;
    constructor(listHost: RtList) {
        if (!listHost.isBufferedList) {
            throw new Error('[rt-load-more] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
    }
    loadMore(evt: MouseEvent): void {
        this.bufferedListService.loadData();
        evt.preventDefault();
    }
}
