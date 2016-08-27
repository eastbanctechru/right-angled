import { Directive, HostListener, SkipSelf } from '@angular/core';

import { FiltersService } from 'e2e4';

@Directive({
    selector: '[rtResetSettings]'
})
export class ResetSettingsDirective {
    constructor(@SkipSelf()private filtersService: FiltersService) {
    }
    @HostListener('click')
    public resetFilters(): void {
        this.filtersService.resetValues();
    }
}
