import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PAGED_LIST_DIRECTIVES, PAGED_LIST_PROVIDERS } from 'right-angled';
import { SHARED_DIRECTIVES, Airport, AirportsService, AirportsPagedListRequest } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, PAGED_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [PAGED_LIST_PROVIDERS],
    templateUrl: 'paged-list-sample.component.html'
})
export class PagedListSampleComponent {
    public airports: Observable<Array<Airport>>;

    constructor(public airportsService: AirportsService) {
        this.airportsService = airportsService;
    }
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        let result = this.airportsService.getAirportsPaged(requestParams);
        this.airports = result.map(resp => resp.items);
        return result;
    };
}
