import {KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy, OnInit} from 'angular2/core';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';

export abstract class RtStatusControlBase implements DoCheck, OnDestroy, OnInit {
    checkStatusChangesBinded: (item: any) => void;
    listDiffers: KeyValueDiffer;
    isVisible: boolean;
    statusForCheck: ProgressState;
    listHost: RtList;
    constructor(listHost: RtList, differs: KeyValueDiffers, statusForCheck: ProgressState) {
        this.statusForCheck = statusForCheck;
        this.listHost = listHost;
        this.listDiffers = differs.find([]).create(null);
        this.checkStatusChangesBinded = this.checkStatusChanges.bind(this);
    }
    ngOnInit(): void {
        this.setVisibility();
    }
    ngOnDestroy(): void {
        delete this.checkStatusChangesBinded;
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffers.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStatusChangesBinded);
        }
    }
    checkStatusChanges(item: any): void {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === this.statusForCheck;
    }
}
