import {Directive} from 'angular2/core';
import {RtList} from '../../lists/list';

@Directive({
    host: {
        '(click)': 'loadMore($event)'
    },
    selector: '[rt-load-more]'
})
export class RtLoadMore {
    listHost: RtList;
    constructor(listHost: RtList) {
        this.listHost = listHost;
        if (!this.listHost.isBufferedList) {
            throw new Error('[rt-load-more] directive can be used only with buffered list services.');
        }
    }
    loadMore(evt: MouseEvent): void {
        this.listHost.serviceInstance.loadData();
        evt.preventDefault();
    }
}
