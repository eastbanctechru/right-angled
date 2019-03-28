import { Component } from '@angular/core';
import { OperationStatusStream } from '../providers/list';
import { Observable } from 'rxjs';
import { OperationStatus } from '../../core/operation-status';
import { map } from 'rxjs/operators';

@Component({
    selector: 'rt-status-request-cancelled',
    template: `
        <ng-content *ngIf="(isVisible$ | async)"></ng-content>
    `
})
export class StatusRequestCancelledComponent {
    public isVisible$: Observable<boolean>;
    constructor(trackedStatusObject: OperationStatusStream) {
        this.isVisible$ = trackedStatusObject.status$.pipe(map(status => status === OperationStatus.Cancelled));
    }
}
