import { Component } from '@angular/core';
import { filter, FilterConfig, RTFiltersService } from 'right-angled';

@Component({
    providers: [RTFiltersService],
    selector: 'rt-demo-default-value-sample',
    templateUrl: 'default-value-sample.component.html'
})
export class DefaultValueSampleComponent {
    public lastRequest: any = '';

    @filter() public defaultField: string = null;
    @filter({ defaultValue: 'abracadabra' } as FilterConfig)
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
