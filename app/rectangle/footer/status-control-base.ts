import {KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {RtList} from '../lists/list';
import {ProgressState} from 'e2e4/src/common/progressState';

export abstract class RtStatusControlBase implements DoCheck, OnDestroy, OnInit {
    checkStateChangesBinded: (item: any) => void;
    listDiffer: KeyValueDiffer;
    isVisible: boolean;
    visibleState: ProgressState;
    listHost: RtList;
    constructor(listHost: RtList, differs: KeyValueDiffers, visibleState: ProgressState) {
        this.visibleState = visibleState;
        this.listHost = listHost;
        this.listDiffer = differs.find([]).create(null);
        this.checkStateChangesBinded = this.checkStateChanges.bind(this);
    }
    ngOnInit(): void {
        this.setVisibility();
    }
    ngOnDestroy(): void {
        delete this.checkStateChangesBinded;
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStateChangesBinded);
        }
    }
    checkStateChanges(item: any): void {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === this.visibleState;
    }
}
