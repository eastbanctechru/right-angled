import { Component, DoCheck, KeyValueDiffers, OnInit, SkipSelf } from '@angular/core';
import { OperationStatus } from 'e2e4';

import { RtList } from '../core/providers';
import { ListStateComponent } from './list-state-component';

@Component({
    selector: 'rt-list-state-no-data',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateNoDataComponent extends ListStateComponent implements DoCheck, OnInit {
    constructor( @SkipSelf() listService: RtList, differs: KeyValueDiffers) {
        super(listService, differs, OperationStatus.NoData);
    }
    public ngOnInit(): void {
        super.ngOnInit();
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
    }
}
