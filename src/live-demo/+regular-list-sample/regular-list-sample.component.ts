import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { REGULAR_LIST_DIRECTIVES, REGULAR_LIST_PROVIDERS } from 'right-angled';

import { SHARED_DIRECTIVES, AirportsService, Airport, AirportsListRequest, ListResponse } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [REGULAR_LIST_PROVIDERS],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    public airports: Observable<Array<Airport>>;
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): Observable<ListResponse<Airport>> => {
        let result = this.airportsService.getAirportsRegular(requestParams);
        this.airports = result.map(resp => resp.items);
        return result;
    };
}
