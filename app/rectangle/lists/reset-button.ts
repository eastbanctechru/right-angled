import {Directive, HostBinding} from 'angular2/core';
import {RtList} from './list';

@Directive({
    host: {
        '(click)': 'resetFilters()'
    },
    selector: '[rt-reset-button]'
})
export class RtResetButton {
    hostList: RtList;
    constructor(hostList: RtList) {
        this.hostList = hostList;
    }
    resetFilters(): void {
        this.hostList.serviceInstance.filterManager.resetFilters();
    }
}
