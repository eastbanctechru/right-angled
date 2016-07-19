import { KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';
import { ProgressState } from 'e2e4';

import { ListComponent } from '../list.component';

export abstract class ListStateComponent implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    private visibleState: ProgressState;
    protected isVisible: boolean;
    constructor(protected listHost: ListComponent, differs: KeyValueDiffers, visibleState: ProgressState) {
        this.visibleState = visibleState;
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
