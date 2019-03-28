import { Component, ChangeDetectionStrategy } from '@angular/core';
import { filter, FilterConfig, RTFiltersService } from 'right-angled';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RTFiltersService],
    selector: 'rt-demo-empty-is-null-sample',
    templateUrl: 'empty-is-null-sample.component.html'
})
export class EmptyIsNullSampleComponent {
    public lastRequest: any = '';

    @filter() public defaultField = '';
    @filter({ emptyIsNull: true } as FilterConfig)
    public configuredField = '';

    constructor(private filtersService: RTFiltersService) {
        filtersService.registerFilterTarget(this);
        this.lastRequest = this.filtersService.getRequestState();
    }
    public serializeRequest(): void {
        this.lastRequest = this.filtersService.getRequestState();
    }
    public resetSate(): void {
        this.filtersService.resetValues();
    }
}
