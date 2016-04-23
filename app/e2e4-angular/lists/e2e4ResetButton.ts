import {Directive} from 'angular2/core';
import {E2E4List} from './e2e4List';

@Directive({
    host: {
        '(click)': 'reset()'
    },
    selector: '[e2e4-reset-button]'
})
export class E2E4ResetButton {
    hostList: E2E4List;
    constructor(hostList: E2E4List) {
        this.hostList = hostList;
    }
    reset(): void {
        this.hostList.ngListServiceMediator.instance.filterManager.resetFilters();
    }
}
