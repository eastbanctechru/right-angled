import { SkipSelf, Component, KeyValueDiffers } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtListLifetimeInfo } from '../../services/injectables';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-list-state-request-canceled',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateRequestCanceledComponent extends ListStateComponent {
    constructor( @SkipSelf() lifetimeInfo: RtListLifetimeInfo, differs: KeyValueDiffers) {
        super(lifetimeInfo, differs, ProgressState.Cancelled);
    }
}
