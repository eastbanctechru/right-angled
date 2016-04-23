import {Directive} from 'angular2/core';
import {ListComponent} from './list.component';

@Directive({
    host: {
        '(click)': 'reset()'
    },
    selector: '[e2e4-reset-button]'
})
export class E2E4ResetButton {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
    reset(): void {
        this.hostList.serviceInstance.filterManager.resetFilters();
    }
}
