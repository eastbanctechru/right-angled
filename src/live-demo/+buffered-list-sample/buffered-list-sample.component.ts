import { Component } from '@angular/core';

import { AirportsBufferedListRequest, AirportsService } from '../shared';

@Component({
    moduleId: module.id,
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    constructor(public airportsService: AirportsService) {
    }

    public loadData = (requestParams: AirportsBufferedListRequest): any => {
        return this.airportsService.getAirportsBuffered(requestParams);
    };
}
