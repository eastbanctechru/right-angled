import { Directive, HostBinding, HostListener, KeyValueDiffers, SkipSelf } from '@angular/core';

import { RtListService } from '../list-service';
import { DisabledByStateControl } from './disabled-by-state-control';

@Directive({
    selector: '[rtReloadData]'
})
export class ReloadDataDirective extends DisabledByStateControl {
    @HostBinding('disabled')
    public disabled: boolean;

    constructor( @SkipSelf() listService: RtListService, kvDiffers: KeyValueDiffers) {
        super(listService, kvDiffers);
    }
    @HostListener('click')
    public reloadData(): void {
        this.listService.reloadData();
    }
    public setDisableState(): void {
        this.disabled = this.listService.busy;
    }
}
