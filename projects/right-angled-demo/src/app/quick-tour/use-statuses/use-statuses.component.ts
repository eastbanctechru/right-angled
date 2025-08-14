import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-statuses',
    templateUrl: 'use-statuses.component.html',
    standalone: false
})
export class UseStatusesComponent {
    constructor(private airportsService: AirportsService) { }
    public getAirports = (request: AirportsListRequest) => {
        return this.airportsService.getAirportsList(request);
    };
}
