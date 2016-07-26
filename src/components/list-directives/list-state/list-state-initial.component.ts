import { SkipSelf, Component, KeyValueDiffers } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtListLifetimeInfo } from '../../services/index';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-list-state-initial',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateInitialComponent extends ListStateComponent {
    constructor( @SkipSelf() lifetimeInfo: RtListLifetimeInfo, differs: KeyValueDiffers) {
        super(lifetimeInfo, differs, ProgressState.Initial);
    }
}
