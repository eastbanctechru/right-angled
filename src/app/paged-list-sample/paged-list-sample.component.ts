import {Component} from '@angular/core';
import {AirportsService} from '../shared/airportsService';
import {filter, RECTANGLE_DIRECTIVES, NgPagedListService} from '../../right-angled/index';
import {SHARED_DIRECTIVES} from '../shared/index';

@Component({
    moduleId: module.id,
    directives: [RECTANGLE_DIRECTIVES, SHARED_DIRECTIVES],
    providers: [AirportsService, NgPagedListService],
    templateUrl: 'paged-list-sample.component.html'
})
export class PagedListSampleComponent {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngPagedListService: NgPagedListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngPagedListService: NgPagedListService) {
        this.airportsService = airportsService;
        this.ngPagedListService = ngPagedListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsPaged(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
