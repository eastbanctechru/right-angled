import {Component, OnInit} from 'angular2/core';
import {AirportsService} from '../airportsService';
import {filter} from 'e2e4/src/filterAnnotation';
import {E2E4_DIRECTIVES, NgSimpleListService} from '../rectangle/main';
import {FooterComponent} from '../footers/footer.component';

@Component({
    directives: [E2E4_DIRECTIVES, FooterComponent],
    providers: [AirportsService, NgSimpleListService],
    templateUrl: 'app/simple-list-sample/simple-list-sample.component.html'
})
export class SimpleListSampleComponent implements OnInit {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngSimpleListService: NgSimpleListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngSimpleListService: NgSimpleListService) {
        this.airportsService = airportsService;
        this.ngSimpleListService = ngSimpleListService.wrap(this, this.loadData);
    }
    ngOnInit(): void {
        this.ngSimpleListService.loadData();
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsSimple(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
