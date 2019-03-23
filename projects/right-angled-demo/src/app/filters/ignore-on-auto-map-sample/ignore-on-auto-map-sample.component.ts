import { Component, ChangeDetectionStrategy } from '@angular/core';
import { filter, FilterConfig, RTFiltersService } from 'right-angled';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RTFiltersService],
    selector: 'rt-demo-ignore-on-auto-map-sample',
    templateUrl: 'ignore-on-auto-map-sample.component.html'
})
export class IgnoreOnAutoMapSampleComponent {
    public valueForAutoMappedField = 'new value';
    public valueForIgnoredField = 'new value';
    @filter() public autoMappedField = 'current value';
    @filter({ ignoreOnAutoMap: true } as FilterConfig)
    public ignoredField = 'current value';

    constructor(private filtersService: RTFiltersService) {
        filtersService.registerFilterTarget(this);
        this.filtersService.getRequestState();
    }
    public applyParams(): void {
        this.filtersService.applyParams({
            autoMappedField: this.valueForAutoMappedField,
            ignoredField: this.valueForIgnoredField
        });
    }
}
