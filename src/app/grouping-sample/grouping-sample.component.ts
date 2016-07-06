import { Component } from '@angular/core';
import { AirportsService } from '../shared/airports.service';
import { filter, RIGHTANGLED_DIRECTIVES, RIGHTANGLED_PROVIDERS, NgListService } from '../../right-angled/index';
import { SHARED_DIRECTIVES } from '../shared/index';

@Component({
    directives: [RIGHTANGLED_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [AirportsService, NgListService, RIGHTANGLED_PROVIDERS],
    templateUrl: 'grouping-sample.component.html'
})
export class GroupingSampleComponent {
    @filter()
    public airportName: string;
    public airportsService: AirportsService;
    public ngListService: NgListService;
    public continents: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngListService: NgListService) {
        this.airportsService = airportsService;
        this.ngListService = ngListService.wrap(this, this.loadData);
    }
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsGroupedByContinent(requestParams).then((result: any) => {
            this.continents = result.items;
            return result;
        });
    };
}
