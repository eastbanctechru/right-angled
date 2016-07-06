import { SkipSelf, Directive, HostListener } from '@angular/core';

import { ListComponent } from '../list.component';

@Directive({
    selector: '[rtResetSettings]'
})
export class ResetSettingsDirective {
    private hostList: ListComponent;
    constructor(@SkipSelf()hostList: ListComponent) {
        this.hostList = hostList;
    }
    @HostListener('click')
    public resetFilters(): void {
        this.hostList.serviceInstance.filtersService.resetValues();
    }
}
