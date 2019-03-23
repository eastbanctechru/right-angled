import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Airport, AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-selection',
    templateUrl: 'use-selection.component.html'
})
export class UseSelectionComponent {
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsListRequest): Observable<Airport[]> => {
        return this.airportsService.getAirportsList(request);
    };
}
