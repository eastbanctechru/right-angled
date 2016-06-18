import {Directive, HostListener} from '@angular/core';
import {RtListComponent} from './list';

@Directive({
    selector: '[rt-reset-button]'
})
export class RtResetButtonDirective {
    hostList: RtListComponent;
    constructor(hostList: RtListComponent) {
        this.hostList = hostList;
    }
    @HostListener('click')
    resetFilters(): void {
        this.hostList.serviceInstance.filterManager.resetValues();
    }
}
