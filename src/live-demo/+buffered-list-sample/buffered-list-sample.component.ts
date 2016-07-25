import { Component } from '@angular/core';
import { BUFFERED_LIST_DIRECTIVES, BUFFERED_LIST_PROVIDERS } from 'right-angled';
import { SHARED_DIRECTIVES, AirportsService, Airport, AirportsBufferedListRequest } from '../shared';

@Component({
    directives: [BUFFERED_LIST_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [BUFFERED_LIST_PROVIDERS],
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    public airports: Array<Airport> = new Array<Airport>();
    constructor(public airportsService: AirportsService) {
    }

    public loadData = (requestParams: AirportsBufferedListRequest): any => {
        return this.airportsService.getAirportsBuffered(requestParams).do(resp => {
            this.airports.push(...resp.items);
        });
    };
}
