import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { REGULAR_LIST_DIRECTIVES, REGULAR_LIST_PROVIDERS } from 'right-angled';

import { SHARED_DIRECTIVES, AirportsService, AirportsListRequest, ListResponse } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [REGULAR_LIST_PROVIDERS],
    templateUrl: 'grouping-sample.component.html'
})
export class GroupingSampleComponent {
    public continents: Observable<Array<any>>;
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): Observable<ListResponse<any>> => {
        let result = this.airportsService.getAirportsGroupedByContinent(requestParams);
        this.continents = result.map(resp => resp.items);
        return result;
    };
}
