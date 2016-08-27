import { Directive, DoCheck, HostBinding, HostListener, KeyValueDiffer, KeyValueDiffers, OnInit, SkipSelf } from '@angular/core';

import { RtListService } from '..//list-service';

@Directive({
    selector: '[rtCancelLoad]'
})
export class CancelLoadDirective implements DoCheck, OnInit {
    private listDiffer: KeyValueDiffer;
    @HostBinding('disabled')
    public disabled: boolean;

    constructor( @SkipSelf() public listService: RtListService, kvDiffers: KeyValueDiffers) {
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
        this.disabled = this.listService.ready;
    }
    @HostListener('click')
    public loadData(): void {
        this.listService.cancelRequests();
    }
}
