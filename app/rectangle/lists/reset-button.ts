import {Directive, HostListener} from '@angular/core';
import {RtList} from './list';

@Directive({
    selector: '[rt-reset-button]'
})
export class RtResetButton {
    hostList: RtList;
    constructor(hostList: RtList) {
        this.hostList = hostList;
    }
    @HostListener('click')
    resetFilters(): void {
        this.hostList.serviceInstance.filterManager.resetValues();
    }
}
