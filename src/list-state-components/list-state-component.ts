import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { ProgressState } from 'e2e4';

import { RtList } from '../core/list';

export abstract class ListStateComponent implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    private visibleState: ProgressState;
    protected isVisible: boolean;
    constructor(protected listService: RtList, differs: KeyValueDiffers, visibleState: ProgressState) {
        this.visibleState = visibleState;
        this.listDiffer = differs.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setVisibility();
    }
    public ngDoCheck(): void {
        let stateDiff = this.listDiffer.diff(this.listService);
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
        this.isVisible = this.listService.state === this.visibleState;
    }
}
