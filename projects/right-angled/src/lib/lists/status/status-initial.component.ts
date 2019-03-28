import { Component } from '@angular/core';
import { OperationStatusStream } from '../providers/list';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperationStatus } from '../../core/operation-status';

@Component({
    selector: 'rt-status-initial',
    template: `
        <ng-content *ngIf="(isVisible$ | async)"></ng-content>
    `
})
export class StatusInitialComponent {
    public isVisible$: Observable<boolean>;
    constructor(trackedStatusObject: OperationStatusStream) {
        this.isVisible$ = trackedStatusObject.status$.pipe(map(status => status === OperationStatus.Initial));
    }
}
