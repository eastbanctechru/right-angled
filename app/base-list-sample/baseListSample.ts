import {Component, OnInit} from 'angular2/core';
import {AirportsService} from './airportsService';
import {filter} from 'e2e4/src/filterAnnotation';
import {E2E4_DIRECTIVES, NgPagedListService} from '../e2e4-angular/main';

@Component({
    directives: [E2E4_DIRECTIVES],
    providers: [AirportsService, NgPagedListService],
    templateUrl: 'app/base-list-sample/baseListSample.html'
})
export class BaseListSample implements OnInit {
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
