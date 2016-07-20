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
    public airports: Observable<Array<Airport>> = Observable.of([]);
    constructor(public airportsService: AirportsService) {
    }

    public loadData = (requestParams: AirportsBufferedListRequest): Observable<ListResponse<Airport>> => {
        let result = this.airportsService.getAirportsBuffered(requestParams);
        this.airports = result.map(resp => resp.items);
        return result;
    };
}
