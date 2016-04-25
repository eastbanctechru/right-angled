import {Component} from 'angular2/core';
import {ListComponent} from '../lists/list.component';
import {ProgressState} from 'e2e4/src/common/progressState';

@Component({
    selector: 'rt-status-progress',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class StatusProgressComponent {
    get isVisible(): boolean {
        return this.listHost.serviceInstance.state === ProgressState.Progress;
    }
    listHost: ListComponent;
    constructor(listHost: ListComponent) {
        this.listHost = listHost;
    }
}
