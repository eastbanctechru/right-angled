import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { filter, RTFilterTarget, RTList, RTStateService } from 'right-angled';
import { Observable } from 'rxjs';

import { AirportsService, ListResponse, LookupItem, QueryStringStateService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: RTFilterTarget,
            useExisting: forwardRef(() => FiltersSampleComponent)
        },
        { provide: RTStateService, useClass: QueryStringStateService, multi: true }
    ],
    selector: 'rt-demo-filters-sample',
    templateUrl: 'filters-sample.component.html'
})
export class FiltersSampleComponent {
    public airportSizes$: Observable<LookupItem[]>;
    public airportTypes$: Observable<LookupItem[]>;
    public lastRequest: any = '';

    @filter() public airportName: string = null;
    @filter() public country: string = null;
    @filter() public airportSize: string = null;
    @filter() public airportType: string = null;

    constructor(private airportsService: AirportsService) {
        this.airportSizes$ = this.airportsService.getAirportSizeLookups();
        this.airportTypes$ = this.airportsService.getAirportTypeLookups();
    }

    public getAirports = (request: any): Observable<ListResponse> => {
        this.lastRequest = request;
        return this.airportsService.getAirportsPagedList(request);
    };
}
