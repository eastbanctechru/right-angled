import { Component } from '@angular/core';
import { SHARED_DIRECTIVES, AirportsService, AirportsBufferedListRequest } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES],
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
