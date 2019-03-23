import { Component } from '@angular/core';
import { OperationStatusStream } from '../providers/list';
import { Observable } from 'rxjs';
import { OperationStatus } from '../../core/operation-status';
import { map } from 'rxjs/operators';

@Component({
    selector: 'rt-status-no-data',
    template: `
        <ng-content *ngIf="(isVisible$ | async)"></ng-content>
    `
})
export class StatusNoDataComponent {
    public isVisible$: Observable<boolean>;
    constructor(trackedStatusObject: OperationStatusStream) {
        this.isVisible$ = trackedStatusObject.status$.pipe(map(status => status === OperationStatus.NoData));
    }
}
