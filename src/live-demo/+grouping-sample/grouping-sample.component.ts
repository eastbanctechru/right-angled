import { Component } from '@angular/core';

import { SHARED_DIRECTIVES, AirportsService, AirportsListRequest } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES],
    moduleId: module.id,
    templateUrl: 'grouping-sample.component.html'
})
export class GroupingSampleComponent {
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): any => {
        return this.airportsService.getAirportsGroupedByContinent(requestParams);
    };
}
