import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { OperationStatus } from 'e2e4';

import { RtOperationStatus } from '../core/providers';

export abstract class StatusComponentBase implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    private visibleState: OperationStatus;
    public isVisible: boolean;
    constructor(protected trackedStatusObject: RtOperationStatus, differs: KeyValueDiffers, visibleState: OperationStatus) {
        this.visibleState = visibleState;
        this.listDiffer = differs.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        let stateDiff = this.listDiffer.diff(this.trackedStatusObject);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
    }
    private checkStateFieldChanges = (item: any): void => {
        if (item.key === 'status') {
            this.setVisibility();
        }
    }
    protected setVisibility(): void {
        this.isVisible = this.trackedStatusObject.status === this.visibleState;
    }
}
