import {Directive, KeyValueDiffers} from 'angular2/core';
import {RtList} from '../../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';

@Directive({
    host: {
        'click': 'loadMore()'
    },
    selector: '[rt-show-more]'
})
export class RtShowMore {
    listHost: RtList;
    constructor(listHost: RtList) {
        this.listHost = listHost;
    }
    loadMore(): void {
        this.listHost.serviceInstance.loadData();
    }
}
