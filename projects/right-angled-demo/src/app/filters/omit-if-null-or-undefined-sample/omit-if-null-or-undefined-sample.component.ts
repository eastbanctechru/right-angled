import { Component } from '@angular/core';
import { filter, FilterConfig, RTFiltersService } from 'right-angled';

@Component({
    providers: [RTFiltersService],
    selector: 'rt-demo-omit-if-null-or-undefined-sample',
    templateUrl: 'omit-if-null-or-undefined-sample.component.html'
})
export class OmitIfNullSampleComponent {
    public lastRequest: any = '';

    @filter() public defaultField: string = null;
    @filter({ omitIfNullOrUndefined: true, emptyIsNull: true } as FilterConfig)
    public configuredField: string = null;

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
