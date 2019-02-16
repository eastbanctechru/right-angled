import { Component } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-reusable-buffered-sample',
    templateUrl: 'reusable-buffered-sample.component.html'
})
export class ReusableBufferedListSampleComponent {
    constructor(private airportsService: AirportsService) {
        this.airportsService = airportsService;
    }
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsPagedList(requestParams);
    };
}
