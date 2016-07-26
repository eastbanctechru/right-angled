import { SkipSelf, Directive, HostListener } from '@angular/core';

import { RtFiltersService } from '../../services/index';

@Directive({
    selector: '[rtResetSettings]'
})
export class ResetSettingsDirective {
    constructor(@SkipSelf()private filtersService: RtFiltersService) {
    }
    @HostListener('click')
    public resetFilters(): void {
        this.filtersService.resetValues();
    }
}
