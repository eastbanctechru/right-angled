import {Directive} from 'angular2/core';
import {E2E4List} from './e2e4List';

@Directive({
    host: {
        '(click)': 'loadData()'
    },
    selector: '[e2e4-load-button]'
})
export class E2E4LoadButton {
    hostList: E2E4List;
    constructor(hostList: E2E4List) {
        this.hostList = hostList;
    }
    loadData(): void {
        this.hostList.ngListServiceMediator.instance.reloadData();
    }
}
