import { Component } from '@angular/core';
import { REGULAR_LIST_DIRECTIVES, REGULAR_LIST_PROVIDERS } from 'right-angled';

import { SHARED_DIRECTIVES, AirportsService, Airport, AirportsListRequest, ListResponse } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [REGULAR_LIST_PROVIDERS],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    public items: Array<Airport> = new Array<Airport>();
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): Promise<ListResponse<Airport>> => {
        return this.airportsService.getAirportsRegular(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
