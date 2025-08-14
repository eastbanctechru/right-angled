import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-sortings',
    templateUrl: 'use-sortings.component.html',
    standalone: false
})
export class UseSortingsComponent {
    constructor(private airportsService: AirportsService) { }
    public getAirports = (request: AirportsListRequest) => {
        return this.airportsService.getAirportsList(request);
    };
}
