import { Component } from '@angular/core';

import { SHARED_DIRECTIVES, AirportsService, AirportsPagedListRequest } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES],
    moduleId: module.id,
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
