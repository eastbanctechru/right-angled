import { SkipSelf, Component, KeyValueDiffers } from '@angular/core';
import { ProgressState } from 'e2e4';

import { ListComponent } from '../list.component';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-list-state-initial',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateInitialComponent extends ListStateComponent {
    constructor(@SkipSelf()listHost: ListComponent, differs: KeyValueDiffers) {
        super(listHost, differs, ProgressState.Initial);
    }
}
