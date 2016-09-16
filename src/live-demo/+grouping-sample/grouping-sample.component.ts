import { Component } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../shared';

@Component({
    templateUrl: 'grouping-sample.component.html'
})
export class GroupingSampleComponent {
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): any => {
        return this.airportsService.getAirportsGroupedByRegion(requestParams);
    };
}
