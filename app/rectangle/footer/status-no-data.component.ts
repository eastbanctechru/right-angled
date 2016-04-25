import {Component, KeyValueDiffers} from 'angular2/core';
import {ListComponent} from '../lists/list.component';
import {ProgressState} from 'e2e4/src/common/progressState';
import {AbstractStatusComponent} from './abstract-status-component';

@Component({
    selector: 'rt-status-no-data',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class StatusNoDataComponent extends AbstractStatusComponent {
    constructor(listHost: ListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Done);
    }
    checkStatusChanges(item: any): void {
        super.checkStatusChanges(item);
        if (item.key === 'loadedCount') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.loadedCount === 0;
    }
}
