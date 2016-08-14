import { KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtLifetimeInfo } from '../../providers/index';

export abstract class ListStateComponent implements DoCheck, OnInit {
    private stateDiffer: KeyValueDiffer;
    private visibleState: ProgressState;
    protected isVisible: boolean;
    constructor(protected lifetimeInfo: RtLifetimeInfo, differs: KeyValueDiffers, visibleState: ProgressState) {
        this.visibleState = visibleState;
        this.stateDiffer = differs.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        let stateDiff = this.stateDiffer.diff(this.lifetimeInfo);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
    }
    private checkStateFieldChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    protected setVisibility(): void {
        this.isVisible = this.lifetimeInfo.state === this.visibleState;
    }
}
