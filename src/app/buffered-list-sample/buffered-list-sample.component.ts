import {Component} from '@angular/core';
import {AirportsService} from '../airportsService';
import {filter, RECTANGLE_DIRECTIVES, NgBufferedListService} from '../../right-angled/index';
import {FooterComponent} from '../shared/footers/footer';

@Component({
    moduleId: module.id,
    directives: [RECTANGLE_DIRECTIVES, FooterComponent],
    providers: [AirportsService, NgBufferedListService],
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngBufferedListService: NgBufferedListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngBufferedListService: NgBufferedListService) {
        this.airportsService = airportsService;
        this.ngBufferedListService = ngBufferedListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsBuffered(requestParams).then(result => {
            this.items.push(...result.items);
            return result;
        });
    };
}
