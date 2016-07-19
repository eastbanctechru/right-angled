import { SkipSelf, Directive, HostBinding, HostListener, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit } from '@angular/core';

import { ListComponent } from '../list.component';

@Directive({
    selector: '[rtLoadData]'
})
export class LoadDataDirective implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    @HostBinding('disabled')
    public disabled: boolean;

    constructor( @SkipSelf() public listHost: ListComponent, listDiffers: KeyValueDiffers) {
        this.listHost = listHost;
        this.listDiffer = listDiffers.find([]).create(null);
    }
    public ngOnInit(): void {
        this.setAttributes();
    }
    public ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkStatusChanges);
        }
    }
    protected checkStatusChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setAttributes();
        }
    }
    public setAttributes(): void {
        this.disabled = this.listHost.serviceInstance.busy;
    }
    @HostListener('click')
    public loadData(): void {
        this.listHost.serviceInstance.reloadData();
    }
}
