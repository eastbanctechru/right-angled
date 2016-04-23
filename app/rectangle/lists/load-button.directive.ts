import {Directive} from 'angular2/core';
import {ListComponent} from './list.component';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: '[rt-load-button]'
})
export class LoadButtonDirective {
    hostList: ListComponent;
    constructor(hostList: ListComponent) {
        this.hostList = hostList;
    }
    loadData(): void {
        this.hostList.serviceInstance.reloadData();
    }
}
