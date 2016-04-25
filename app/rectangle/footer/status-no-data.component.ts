import {Component} from 'angular2/core';
import {ListComponent} from '../lists/list.component';
import {ProgressState} from 'e2e4/src/common/progressState';

@Component({
    selector: 'rt-status-no-data',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class StatusNoDataComponent {
    get isVisible(): boolean {
        return this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.loadedCount === 0;
    }
    listHost: ListComponent;
    constructor(listHost: ListComponent) {
        this.listHost = listHost;
    }
}
