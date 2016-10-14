import { Directive, HostBinding, HostListener, KeyValueDiffers, SkipSelf } from '@angular/core';

import { RtListService } from '../list-service';
import { DisabledByStateControl } from './disabled-by-state-control';

@Directive({
    selector: '[rtCancelLoad]'
})
export class CancelLoadDirective extends DisabledByStateControl {
    @HostBinding('disabled')
    public disabled: boolean;

    constructor( @SkipSelf() listService: RtListService, kvDiffers: KeyValueDiffers) {
        super(listService, kvDiffers);
    }
    @HostListener('click')
    public cancelLoad(): void {
        this.listService.cancelRequests();
    }
    public setDisableState(): void {
        this.disabled = this.listService.ready;
    }
}
