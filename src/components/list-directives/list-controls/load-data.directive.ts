import { SkipSelf, Directive, HostBinding, HostListener, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';

import { RtLifetimeInfo } from '../../providers/index';
import { ListComponent } from '../list.component';

@Directive({
    selector: '[rtLoadData]'
})
export class LoadDataDirective implements DoCheck, OnInit {
    private stateDiffer: KeyValueDiffer;
    @HostBinding('disabled')
    public disabled: boolean;

    constructor( @SkipSelf() public lifetimeInfo: RtLifetimeInfo, @SkipSelf() public listComponent: ListComponent, stateDiffers: KeyValueDiffers) {
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
        this.listComponent.listService.reloadData();
    }
}
