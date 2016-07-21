import { Component } from '@angular/core';
import { BUFFERED_LIST_DIRECTIVES, BUFFERED_LIST_PROVIDERS } from 'right-angled';
import { SHARED_DIRECTIVES, AirportsService, Airport, AirportsBufferedListRequest, ListResponse } from '../shared';

@Component({
    directives: [BUFFERED_LIST_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [BUFFERED_LIST_PROVIDERS],
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    public items: Array<Airport> = new Array<Airport>();
    constructor(public airportsService: AirportsService) {
    }

    public loadData = (requestParams: AirportsBufferedListRequest): Promise<ListResponse<Airport>> => {
        return this.airportsService.getAirportsBuffered(requestParams).then(result => {
            this.items.push(...result.items);
            return result;
        });
    };
}
