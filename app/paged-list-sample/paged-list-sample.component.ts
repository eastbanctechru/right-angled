import {Component, OnInit} from 'angular2/core';
import {AirportsService} from '../airportsService';
import {filter} from 'e2e4/src/filterAnnotation';
import {E2E4_DIRECTIVES, NgPagedListService} from '../rectangle/main';
import {FooterComponent} from '../footers/footer.component';

@Component({
    directives: [E2E4_DIRECTIVES, FooterComponent],
    providers: [AirportsService, NgPagedListService],
    templateUrl: 'app/paged-list-sample/paged-list-sample.component.html'
})
export class PagedListSampleComponent implements OnInit {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngPagedListService: NgPagedListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngPagedListService: NgPagedListService) {
        this.airportsService = airportsService;
        this.ngPagedListService = ngPagedListService.wrap(this, this.loadData);
    }
    ngOnInit(): void {
        this.ngPagedListService.loadData();
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsPaged(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
