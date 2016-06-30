import { Component } from '@angular/core';
import { AirportsService } from '../shared/airportsService';
import { filter, RECTANGLE_DIRECTIVES, NgBufferedListService } from '../../right-angled/index';
import { SHARED_DIRECTIVES } from '../shared/index';

@Component({
    directives: [RECTANGLE_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [AirportsService, NgBufferedListService],
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    @filter()
    public airportName: string;
    public airportsService: AirportsService;
    public ngBufferedListService: NgBufferedListService;
    public items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngBufferedListService: NgBufferedListService) {
        this.airportsService = airportsService;
        this.ngBufferedListService = ngBufferedListService.wrap(this, this.loadData);
    }
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsBuffered(requestParams).then((result: any) => {
            this.items.push(...result.items);
            return result;
        });
    };
}
