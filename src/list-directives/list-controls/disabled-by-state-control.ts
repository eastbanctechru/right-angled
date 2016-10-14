import { DoCheck, KeyValueDiffer, KeyValueDiffers, OnInit, SkipSelf } from '@angular/core';

import { RtListService } from '../list-service';

export abstract class DisabledByStateControl implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    public disabled: boolean;

    constructor( @SkipSelf() public listService: RtListService, listDiffers: KeyValueDiffers) {
        this.listDiffer = listDiffers.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setDisableState();
    }
    public ngDoCheck(): void {
        let stateDiff = this.listDiffer.diff(this.listService);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
    }
    protected checkStateFieldChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setDisableState();
        }
    }
    public abstract setDisableState(): void;
}
