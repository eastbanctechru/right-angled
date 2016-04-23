import {Directive} from 'angular2/core';
import {ListComponent} from './list.component';

@Directive({
    host: {
        '(click)': 'reset()'
    },
    selector: '[rt-reset-button]'
})
export class ResetButtonDirective {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
    reset(): void {
        this.hostList.serviceInstance.filterManager.resetFilters();
    }
}
