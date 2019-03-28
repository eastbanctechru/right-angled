import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { filter, FilterConfig, RTFilterTarget, RTStateService } from 'right-angled';
import { Observable } from 'rxjs';

import { AirportsPagedListRequest, AirportsService, ListResponse, QueryStringStateService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: RTStateService, useClass: QueryStringStateService, multi: true },
        {
            provide: RTFilterTarget,
            useExisting: forwardRef(() => UsePersistenceComponent)
        }
    ],
    selector: 'rt-demo-use-persistence',
    templateUrl: 'use-persistence.component.html'
})
export class UsePersistenceComponent {
    @filter() public airportName: string = null;
    @filter({ defaultValue: 'Iceland', parameterName: 'country' } as FilterConfig)
    public countryName: string = null;

    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsPagedListRequest): Observable<ListResponse> => {
        return this.airportsService.getAirportsPagedList(request);
    };
}
