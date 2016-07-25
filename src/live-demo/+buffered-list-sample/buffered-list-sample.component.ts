import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BUFFERED_LIST_DIRECTIVES, BUFFERED_LIST_PROVIDERS } from 'right-angled';
import { SHARED_DIRECTIVES, AirportsService, Airport, AirportsBufferedListRequest, ListResponse } from '../shared';

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

    public loadData = (requestParams: AirportsBufferedListRequest): Observable<ListResponse<Airport>> => {
        return this.airportsService.getAirportsBuffered(requestParams).do(resp => {
            this.airports.push(...resp.items);
        });
    };
}
