import {Directive, HostBinding} from 'angular2/core';
import {ListComponent} from './list.component';

@Directive({
    host: {
        '(click)': 'resetFilters()'
    },
    selector: '[rt-reset-button]'
})
export class ResetButtonDirective {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
    resetFilters(): void {
        this.hostList.serviceInstance.filterManager.resetFilters();
    }
}
