import {Component} from '@angular/core';
import {AirportsService} from '../airportsService';
import {filter, RECTANGLE_DIRECTIVES, NgSimpleListService} from '../../right-angled/index';
import {FooterComponent} from '../shared/footers/footer';
@Component({
    moduleId: module.id,
    directives: [RECTANGLE_DIRECTIVES, FooterComponent],
    providers: [AirportsService, NgSimpleListService],
    templateUrl: 'simple-list-sample.component.html'
})
export class SimpleListSampleComponent {
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
