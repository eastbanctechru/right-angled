import { Component } from '@angular/core';
import { PAGED_LIST_DIRECTIVES, PAGED_LIST_PROVIDERS } from 'right-angled';

import { SHARED_DIRECTIVES, AirportsService, AirportsPagedListRequest } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, PAGED_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [PAGED_LIST_PROVIDERS],
    templateUrl: 'paged-list-sample.component.html'
})
export class PagedListSampleComponent {
    constructor(public airportsService: AirportsService) {
        this.airportsService = airportsService;
    }
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsPaged(requestParams);
    };
}
