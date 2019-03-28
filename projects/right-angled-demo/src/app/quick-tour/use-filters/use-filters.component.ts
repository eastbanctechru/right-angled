import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { filter, FilterConfig, RTFilterTarget, RTList } from 'right-angled';
import { Observable } from 'rxjs';

import { AirportsPagedListRequest, AirportsService, ListResponse } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: RTFilterTarget,
            useExisting: forwardRef(() => UseFiltersComponent)
        }
    ],
    selector: 'rt-demo-use-filters',
    templateUrl: 'use-filters.component.html'
})
export class UseFiltersComponent {
    @filter() public airportName: string = null;
    @filter({ defaultValue: 'Iceland', parameterName: 'country' } as FilterConfig)
    public countryName: string = null;

    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsPagedListRequest): Observable<ListResponse> => {
        return this.airportsService.getAirportsPagedList(request);
    };
    public listInit(list: RTList): void {
        list.registerFilterTarget(this);
    }
}
