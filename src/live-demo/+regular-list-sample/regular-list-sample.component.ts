import { Component } from '@angular/core';
import { REGULAR_LIST_DIRECTIVES, REGULAR_LIST_PROVIDERS } from 'right-angled';

import { SHARED_DIRECTIVES, AirportsService, AirportsListRequest } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [REGULAR_LIST_PROVIDERS],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    constructor(public airportsService: AirportsService) {
    }
    public loadData = (requestParams: AirportsListRequest): any => {
        return this.airportsService.getAirportsRegular(requestParams);
    };
}
