import { DoCheck, KeyValueDiffers, OnInit } from '@angular/core';
import { OperationStatus } from 'e2e4';
import { RTOperationStatus } from '../providers/list';
export declare abstract class StatusComponentBase implements DoCheck, OnInit {
    protected trackedStatusObject: RTOperationStatus;
    isVisible: boolean;
    private listDiffer;
    private visibleState;
    constructor(trackedStatusObject: RTOperationStatus, differs: KeyValueDiffers, visibleState: OperationStatus);
    ngOnInit(): void;
    ngDoCheck(): void;
    protected setVisibility(): void;
    private checkStateFieldChanges;
}
