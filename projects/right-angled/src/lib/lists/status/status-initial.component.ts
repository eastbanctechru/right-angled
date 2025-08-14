import { Component } from '@angular/core';
import { OperationStatusStream } from '../providers/list';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperationStatus } from '../../core/operation-status';

@Component({
    selector: 'rt-status-initial',
    template: `
        @if ((isVisible$ | async)) {
          <ng-content></ng-content>
        }
        `,
    standalone: false
})
export class StatusInitialComponent {
    public isVisible$: Observable<boolean>;
    constructor(trackedStatusObject: OperationStatusStream) {
        this.isVisible$ = trackedStatusObject.status$.pipe(map(status => status === OperationStatus.Initial));
    }
}
