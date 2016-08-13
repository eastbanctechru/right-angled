import { SkipSelf, Component, KeyValueDiffers } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtLifetimeInfo } from '../../services/index';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-list-state-progress',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateInProgressComponent extends ListStateComponent {
    constructor( @SkipSelf() lifetimeInfo: RtLifetimeInfo, differs: KeyValueDiffers) {
        super(lifetimeInfo, differs, ProgressState.Progress);
    }
}
