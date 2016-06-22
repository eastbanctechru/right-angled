import {Component} from '@angular/core';
import {AirportsService} from '../airportsService';
import {filter, RECTANGLE_DIRECTIVES, NgListService} from '../../right-angled/index';
import {SHARED_DIRECTIVES} from '../shared/index';

@Component({
    moduleId: module.id,
    directives: [RECTANGLE_DIRECTIVES, SHARED_DIRECTIVES],
    providers: [AirportsService, NgListService],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngListService: NgListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngListService: NgListService) {
        this.airportsService = airportsService;
        this.ngListService = ngListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsRegular(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
