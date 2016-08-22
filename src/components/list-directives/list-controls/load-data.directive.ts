import { SkipSelf, Directive, HostBinding, HostListener, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';

import { RtListService } from '../list-service';

@Directive({
    selector: '[rtLoadData]'
})
export class LoadDataDirective implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    @HostBinding('disabled')
    public disabled: boolean;

    constructor(@SkipSelf() public listService: RtListService, kvDiffers: KeyValueDiffers) {
        this.listDiffer = kvDiffers.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setAttributes();
    }
    public ngDoCheck(): void {
        let stateDiff = this.listDiffer.diff(this.listService);
        if (stateDiff) {
            stateDiff.forEachChangedItem(this.checkStateFieldChanges);
        }
    }
    protected checkStateFieldChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setAttributes();
        }
    }
    public setAttributes(): void {
        this.disabled = this.listService.busy;
    }
    @HostListener('click')
    public loadData(): void {
        this.listService.reloadData();
    }
}
