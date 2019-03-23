import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Airport, AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-statuses',
    templateUrl: 'use-statuses.component.html'
})
export class UseStatusesComponent {
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsListRequest): Observable<Airport[]> => {
        return this.airportsService.getAirportsList(request);
    };
}
