import {Component} from 'angular2/core';
import {AirportsService} from '../airportsService';
import {filter} from 'e2e4/src/filterAnnotation';
import {RECTANGLE_DIRECTIVES, NgSimpleListService} from '../rectangle/main';
import {Footer} from '../footers/footer';
@Component({
    directives: [RECTANGLE_DIRECTIVES, Footer],
    providers: [AirportsService, NgSimpleListService],
    templateUrl: 'app/simple-list-sample/simple-list-sample.html'
})
export class SimpleListSample {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngSimpleListService: NgSimpleListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngSimpleListService: NgSimpleListService) {
        this.airportsService = airportsService;
        this.ngSimpleListService = ngSimpleListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsSimple(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
