import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { OperationStatus } from 'e2e4';

import { RTOperationStatus } from '../core/providers';

export abstract class StatusComponentBase implements DoCheck, OnInit {
    public isVisible: boolean;
    private listDiffer: KeyValueDiffer<string, any>;
    private visibleState: OperationStatus;
    constructor(protected trackedStatusObject: RTOperationStatus, differs: KeyValueDiffers, visibleState: OperationStatus) {
        this.visibleState = visibleState;
        this.listDiffer = differs.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        const stateDiff = this.listDiffer.diff(this.trackedStatusObject);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
    }
    protected setVisibility(): void {
        this.isVisible = this.trackedStatusObject.status === this.visibleState;
    }
    private checkStateFieldChanges = (item: any): void => {
        if (item.key === 'status' || item.key === 'statusInternal') {
            this.setVisibility();
        }
    }
}
