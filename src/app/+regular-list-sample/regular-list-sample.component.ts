import { Component } from '@angular/core';
import { filter, REGULAR_LIST_DIRECTIVES, REGULAR_LIST_PROVIDERS, NgListService } from '../../right-angled';

import { SHARED_DIRECTIVES, AirportsService } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [REGULAR_LIST_PROVIDERS],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    @filter()
    public airportName: string;
    public airportsService: AirportsService;
    public ngListService: NgListService;
    public items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngListService: NgListService) {
        this.airportsService = airportsService;
        this.ngListService = ngListService.wrap(this, this.loadData);
    }
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsRegular(requestParams).then((result: any) => {
            this.items = result.items;
            return result;
        });
    };
}
