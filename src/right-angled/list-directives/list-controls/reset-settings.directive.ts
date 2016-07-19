import { SkipSelf, Directive, HostListener } from '@angular/core';

import { ListComponent } from '../list.component';

@Directive({
    selector: '[rtResetSettings]'
})
export class ResetSettingsDirective {
    constructor(@SkipSelf()private listHost: ListComponent) {
    }
    @HostListener('click')
    public resetFilters(): void {
        this.listHost.serviceInstance.filtersService.resetValues();
    }
}
