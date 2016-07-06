import { SkipSelf, Directive, HostListener } from '@angular/core';
import { RtListComponent } from './list.component';

@Directive({
    selector: '[rt-reset-button]'
})
export class RtResetButtonDirective {
    private hostList: RtListComponent;
    constructor(@SkipSelf()hostList: RtListComponent) {
        this.hostList = hostList;
    }
    @HostListener('click')
    public resetFilters(): void {
        this.hostList.serviceInstance.filtersService.resetValues();
    }
}
