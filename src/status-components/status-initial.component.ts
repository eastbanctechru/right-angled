import { Component, DoCheck, KeyValueDiffers, OnInit } from '@angular/core';
import { OperationStatus } from 'e2e4';

import { RtOperationStatus } from '../core/providers';
import { StatusComponentBase } from './status-component-base';

@Component({
    selector: 'rt-status-initial',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class StatusInitialComponent extends StatusComponentBase implements DoCheck, OnInit {
    constructor(trackedStatusObject: RtOperationStatus, differs: KeyValueDiffers) {
        super(trackedStatusObject, differs, OperationStatus.Initial);
    }
    public ngOnInit(): void {
        super.ngOnInit();
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
    }
}
