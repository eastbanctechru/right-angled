import {Directive, KeyValueDiffers} from 'angular2/core';
import {ListComponent} from '../../lists/list.component';
import {ProgressState} from 'e2e4/src/common/progressState';

@Directive({
    host: {
        'click': 'loadMore()'
    },
    selector: '[rt-show-more]'
})
export class ShowMoreDirective {
    listHost: ListComponent;
    constructor(listHost: ListComponent) {
        this.listHost = listHost;
    }
    loadMore(): void {
        this.listHost.serviceInstance.loadData();
    }
}
