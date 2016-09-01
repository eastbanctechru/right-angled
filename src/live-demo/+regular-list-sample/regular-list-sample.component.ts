import { Component } from '@angular/core';

import { AirportsListRequest, AirportsService } from '../shared';

@Component({
    moduleId: module.id,
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): any => {
        return this.airportsService.getAirportsRegular(requestParams);
    };
}
