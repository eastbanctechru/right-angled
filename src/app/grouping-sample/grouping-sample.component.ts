import {Component} from '@angular/core';
import {AirportsService} from '../shared/airportsService';
import {filter, RECTANGLE_DIRECTIVES, NgListService} from '../../right-angled/index';
import {SHARED_DIRECTIVES} from '../shared/index';

@Component({
    moduleId: module.id,
    directives: [RECTANGLE_DIRECTIVES, SHARED_DIRECTIVES],
    providers: [AirportsService, NgListService],
    templateUrl: 'grouping-sample.component.html'
})
export class GroupingSampleComponent {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngListService: NgListService;
    continents: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngListService: NgListService) {
        this.airportsService = airportsService;
        this.ngListService = ngListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsGroupedByContinent(requestParams).then(result => {
            this.continents = result.items;
            return result;
        });
    };
}
