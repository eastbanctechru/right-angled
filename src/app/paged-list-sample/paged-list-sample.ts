import {Component} from '@angular/core';
import {AirportsService} from '../airportsService';
import {filter} from 'e2e4';
import {RECTANGLE_DIRECTIVES, NgPagedListService} from '../../right-angled/index';
import {FooterComponent} from '../shared/footers/footer';

@Component({
    directives: [RECTANGLE_DIRECTIVES, FooterComponent],
    providers: [AirportsService, NgPagedListService],
    templateUrl: 'app/paged-list-sample/paged-list-sample.html'
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
