import { SkipSelf, Directive, HostBinding, HostListener, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';

import { RtLifetimeInfo, RtListService } from '../../providers/index';

@Directive({
    selector: '[rtLoadData]'
})
export class LoadDataDirective implements DoCheck, OnInit {
    private stateDiffer: KeyValueDiffer;
    @HostBinding('disabled')
    public disabled: boolean;

    constructor( @SkipSelf() public lifetimeInfo: RtLifetimeInfo, @SkipSelf() public listService: RtListService, stateDiffers: KeyValueDiffers) {
        this.lifetimeInfo = lifetimeInfo;
        this.stateDiffer = stateDiffers.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setAttributes();
    }
    public ngDoCheck(): void {
        let stateDiff = this.stateDiffer.diff(this.lifetimeInfo);
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
        this.disabled = this.lifetimeInfo.busy;
    }
    @HostListener('click')
    public loadData(): void {
        this.listService.reloadData();
    }
}
