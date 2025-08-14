import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-selection',
    templateUrl: 'use-selection.component.html',
    standalone: false
})
export class UseSelectionComponent {
    constructor(private airportsService: AirportsService) { }
    public getAirports = (request: AirportsListRequest) => {
        return this.airportsService.getAirportsList(request);
    };
}
