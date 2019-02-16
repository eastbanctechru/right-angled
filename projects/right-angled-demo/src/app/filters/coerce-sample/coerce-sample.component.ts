import { Component } from '@angular/core';
import { filter, FilterConfig, RTFiltersService } from 'right-angled';

@Component({
    providers: [RTFiltersService],
    selector: 'rt-demo-coerce-sample',
    templateUrl: 'coerce-sample.component.html'
})
export class CoerceSampleComponent {
    public lastRequest: any = '';

    @filter() public defaultField: string = null;
    @filter({ coerce: false } as FilterConfig)
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
