import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Airport, AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-sortings',
    templateUrl: 'use-sortings.component.html'
})
export class UseSortingsComponent {
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsListRequest): Observable<Airport[]> => {
        return this.airportsService.getAirportsList(request);
    };
}
