import {Directive} from 'angular2/core';
import {ListComponent} from './list.component';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: '[e2e4-load-button]'
})
export class E2E4LoadButton {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
    loadData(): void {
        this.hostList.serviceInstance.reloadData();
    }
}
