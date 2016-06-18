import {KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit} from '@angular/core';
import {RtListComponent} from '../lists/list';
import {ProgressState} from 'e2e4';

export abstract class RtStatusControlBase implements DoCheck, OnInit {
    listDiffer: KeyValueDiffer;
    isVisible: boolean;
    visibleState: ProgressState;
    listHost: RtListComponent;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, visibleState: ProgressState) {
        this.visibleState = visibleState;
        this.listHost = listHost;
        this.listDiffer = differs.find([]).create(null);
    }
    ngOnInit(): void {
        this.setVisibility();
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStateChanges);
        }
    }
    checkStateChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === this.visibleState;
    }
}
