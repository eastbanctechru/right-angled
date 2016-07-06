import { KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';
import { RtListComponent } from '../list-components/list.component';
import { ProgressState } from 'e2e4';

export abstract class RtStatusControlBase implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    private visibleState: ProgressState;
    protected isVisible: boolean;
    protected listHost: RtListComponent;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, visibleState: ProgressState) {
        this.visibleState = visibleState;
        this.listHost = listHost;
        this.listDiffer = differs.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStateChanges);
        }
    }
    private checkStateChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    protected setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === this.visibleState;
    }
}
