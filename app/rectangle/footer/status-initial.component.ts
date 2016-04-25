import {Component, KeyValueDiffers} from 'angular2/core';
import {ListComponent} from '../lists/list.component';
import {ProgressState} from 'e2e4/src/common/progressState';
import {AbstractStatusComponent} from './abstract-status-component';
@Component({
    selector: 'rt-status-initial',
    template: `<span *ngIf="isVisible"><ng-content></ng-content></span>`
})
export class StatusInitialComponent extends AbstractStatusComponent {
    constructor(listHost: ListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Initial);
    }
}
