import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-list',
    templateUrl: 'use-list.component.html',
    standalone: false
})
export class UseListComponent {
    constructor(private airportsService: AirportsService) { }
    public getAirports = (request: AirportsListRequest) => {
        return this.airportsService.getAirportsList(request);
    };
}
