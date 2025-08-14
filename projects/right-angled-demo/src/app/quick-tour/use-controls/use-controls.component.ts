import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-controls',
    templateUrl: 'use-controls.component.html',
    standalone: false
})
export class UseControlsComponent {
    constructor(private airportsService: AirportsService) { }
    public getAirports = (request: AirportsListRequest) => {
        return this.airportsService.getAirportsList(request);
    };
}
